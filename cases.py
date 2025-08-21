from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, Field
from fastapi import HTTPException, status
import aiosqlite
from decimal import Decimal

# Pydantic modelleri
class CaseCreate(BaseModel):
    case_number: str = Field(..., min_length=1, max_length=50)
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    case_type: str = Field(..., min_length=1, max_length=100)
    client_id: Optional[int] = None
    court_name: Optional[str] = None
    judge_name: Optional[str] = None
    opposing_party: Optional[str] = None
    case_value: Optional[float] = None
    start_date: Optional[date] = None
    expected_end_date: Optional[date] = None
    priority: str = Field(default="medium", pattern="^(low|medium|high|urgent)$")
    notes: Optional[str] = None

class CaseUpdate(BaseModel):
    case_number: Optional[str] = Field(None, min_length=1, max_length=50)
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    case_type: Optional[str] = Field(None, min_length=1, max_length=100)
    status: Optional[str] = Field(None, pattern="^(active|pending|closed|archived)$")
    client_id: Optional[int] = None
    court_name: Optional[str] = None
    judge_name: Optional[str] = None
    opposing_party: Optional[str] = None
    case_value: Optional[float] = None
    start_date: Optional[date] = None
    expected_end_date: Optional[date] = None
    actual_end_date: Optional[date] = None
    priority: Optional[str] = Field(None, pattern="^(low|medium|high|urgent)$")
    notes: Optional[str] = None

class CaseResponse(BaseModel):
    id: int
    case_number: str
    title: str
    description: Optional[str] = None
    case_type: str
    status: str
    client_id: Optional[int] = None
    client_name: Optional[str] = None
    user_id: int
    court_name: Optional[str] = None
    judge_name: Optional[str] = None
    opposing_party: Optional[str] = None
    case_value: Optional[float] = None
    start_date: Optional[str] = None
    expected_end_date: Optional[str] = None
    actual_end_date: Optional[str] = None
    priority: str
    notes: Optional[str] = None
    created_at: str
    updated_at: str

class HearingCreate(BaseModel):
    case_id: int
    hearing_date: datetime
    court_room: Optional[str] = None
    hearing_type: str = Field(default="durusma", max_length=50)
    notes: Optional[str] = None

class HearingUpdate(BaseModel):
    hearing_date: Optional[datetime] = None
    court_room: Optional[str] = None
    hearing_type: Optional[str] = Field(None, max_length=50)
    status: Optional[str] = Field(None, pattern="^(scheduled|completed|postponed|cancelled)$")
    notes: Optional[str] = None
    result: Optional[str] = None
    next_hearing_date: Optional[datetime] = None

class HearingResponse(BaseModel):
    id: int
    case_id: int
    case_title: Optional[str] = None
    hearing_date: str
    court_room: Optional[str] = None
    hearing_type: str
    status: str
    notes: Optional[str] = None
    result: Optional[str] = None
    next_hearing_date: Optional[str] = None
    created_at: str

# Dava veritabanı işlemleri
async def create_case(case_data: CaseCreate, user_id: int):
    """Yeni dava oluştur"""
    # Dava numarası benzersizlik kontrolü
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            "SELECT id FROM cases WHERE case_number = ?", (case_data.case_number,)
        )
        existing_case = await cursor.fetchone()
        if existing_case:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Bu dava numarası zaten kullanılıyor"
            )
    
    # Müşteri ID kontrolü (eğer belirtilmişse)
    if case_data.client_id:
        async with aiosqlite.connect("avukat.db") as db:
            cursor = await db.execute(
                "SELECT id FROM clients WHERE id = ?", (case_data.client_id,)
            )
            client = await cursor.fetchone()
            if not client:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Belirtilen müşteri bulunamadı"
                )
    
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """INSERT INTO cases 
               (case_number, title, description, case_type, client_id, user_id, 
                court_name, judge_name, opposing_party, case_value, start_date, 
                expected_end_date, priority, notes) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                case_data.case_number, case_data.title, case_data.description,
                case_data.case_type, case_data.client_id, user_id,
                case_data.court_name, case_data.judge_name, case_data.opposing_party,
                case_data.case_value, case_data.start_date, case_data.expected_end_date,
                case_data.priority, case_data.notes
            )
        )
        await db.commit()
        
        # Oluşturulan davayı getir
        case_id = cursor.lastrowid
        return await get_case_by_id(case_id, user_id)

async def get_case_by_id(case_id: int, user_id: int):
    """ID'ye göre dava getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """SELECT c.*, cl.name as client_name 
               FROM cases c 
               LEFT JOIN clients cl ON c.client_id = cl.id 
               WHERE c.id = ? AND c.user_id = ?""",
            (case_id, user_id)
        )
        case = await cursor.fetchone()
        return dict(case) if case else None

async def get_user_cases(user_id: int, skip: int = 0, limit: int = 100, status_filter: Optional[str] = None):
    """Kullanıcının davalarını getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        
        query = """SELECT c.*, cl.name as client_name 
                   FROM cases c 
                   LEFT JOIN clients cl ON c.client_id = cl.id 
                   WHERE c.user_id = ?"""
        params = [user_id]
        
        if status_filter:
            query += " AND c.status = ?"
            params.append(status_filter)
        
        query += " ORDER BY c.created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, skip])
        
        cursor = await db.execute(query, params)
        cases = await cursor.fetchall()
        return [dict(case) for case in cases]

async def update_case(case_id: int, case_data: CaseUpdate, user_id: int):
    """Dava güncelle"""
    # Davanın var olup olmadığını kontrol et
    existing_case = await get_case_by_id(case_id, user_id)
    if not existing_case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dava bulunamadı"
        )
    
    # Güncellenecek alanları belirle
    update_data = case_data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Güncellenecek alan belirtilmedi"
        )
    
    # Dava numarası benzersizlik kontrolü
    if 'case_number' in update_data:
        async with aiosqlite.connect("avukat.db") as db:
            cursor = await db.execute(
                "SELECT id FROM cases WHERE case_number = ? AND id != ?", 
                (update_data['case_number'], case_id)
            )
            existing = await cursor.fetchone()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Bu dava numarası zaten kullanılıyor"
                )
    
    # Müşteri ID kontrolü
    if 'client_id' in update_data and update_data['client_id']:
        async with aiosqlite.connect("avukat.db") as db:
            cursor = await db.execute("SELECT id FROM clients WHERE id = ?", (update_data['client_id'],))
            client = await cursor.fetchone()
            if not client:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Belirtilen müşteri bulunamadı"
                )
    
    # Tarih güncellemesi için string format'a çevir
    for date_field in ['start_date', 'expected_end_date', 'actual_end_date']:
        if date_field in update_data and update_data[date_field]:
            update_data[date_field] = update_data[date_field].isoformat()
    
    # updated_at alanını ekle
    update_data['updated_at'] = datetime.now().isoformat()
    
    # SQL sorgusu oluştur
    set_clause = ", ".join([f"{key} = ?" for key in update_data.keys()])
    values = list(update_data.values()) + [case_id, user_id]
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute(
            f"UPDATE cases SET {set_clause} WHERE id = ? AND user_id = ?",
            values
        )
        await db.commit()
        
        # Güncellenmiş davayı getir
        return await get_case_by_id(case_id, user_id)

async def delete_case(case_id: int, user_id: int):
    """Davayı sil"""
    # Davanın var olup olmadığını kontrol et
    existing_case = await get_case_by_id(case_id, user_id)
    if not existing_case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dava bulunamadı"
        )
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute("DELETE FROM cases WHERE id = ? AND user_id = ?", (case_id, user_id))
        await db.commit()
        return {"message": "Dava başarıyla silindi"}

async def search_cases(user_id: int, query: str):
    """Dava arama"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        search_pattern = f"%{query}%"
        cursor = await db.execute(
            """SELECT c.*, cl.name as client_name 
               FROM cases c 
               LEFT JOIN clients cl ON c.client_id = cl.id 
               WHERE c.user_id = ? AND (
                   c.case_number LIKE ? OR 
                   c.title LIKE ? OR 
                   c.description LIKE ? OR 
                   c.case_type LIKE ? OR 
                   c.court_name LIKE ? OR 
                   c.judge_name LIKE ? OR 
                   c.opposing_party LIKE ? OR 
                   cl.name LIKE ?
               )
               ORDER BY c.created_at DESC""",
            (user_id, search_pattern, search_pattern, search_pattern, search_pattern,
             search_pattern, search_pattern, search_pattern, search_pattern)
        )
        cases = await cursor.fetchall()
        return [dict(case) for case in cases]

async def get_case_statistics(user_id: int):
    """Dava istatistikleri"""
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed,
                SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived,
                SUM(CASE WHEN priority = 'urgent' THEN 1 ELSE 0 END) as urgent,
                SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as high_priority,
                AVG(case_value) as avg_case_value,
                SUM(case_value) as total_case_value
               FROM cases WHERE user_id = ?""",
            (user_id,)
        )
        stats = await cursor.fetchone()
        return dict(stats) if stats else {}

# Duruşma veritabanı işlemleri
async def create_hearing(hearing_data: HearingCreate, user_id: int):
    """Yeni duruşma oluştur"""
    # Davanın var olup olmadığını kontrol et
    case = await get_case_by_id(hearing_data.case_id, user_id)
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Belirtilen dava bulunamadı"
        )
    
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """INSERT INTO hearings 
               (case_id, hearing_date, court_room, hearing_type, notes) 
               VALUES (?, ?, ?, ?, ?)""",
            (
                hearing_data.case_id,
                hearing_data.hearing_date.isoformat(),
                hearing_data.court_room,
                hearing_data.hearing_type,
                hearing_data.notes
            )
        )
        await db.commit()
        
        # Oluşturulan duruşmayı getir
        hearing_id = cursor.lastrowid
        return await get_hearing_by_id(hearing_id, user_id)

async def get_hearing_by_id(hearing_id: int, user_id: int):
    """ID'ye göre duruşma getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """SELECT h.*, c.title as case_title 
               FROM hearings h 
               LEFT JOIN cases c ON h.case_id = c.id 
               WHERE h.id = ? AND c.user_id = ?""",
            (hearing_id, user_id)
        )
        hearing = await cursor.fetchone()
        return dict(hearing) if hearing else None

async def get_user_hearings(user_id: int, skip: int = 0, limit: int = 100):
    """Kullanıcının duruşmalarını getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """SELECT h.*, c.title as case_title 
               FROM hearings h 
               LEFT JOIN cases c ON h.case_id = c.id 
               WHERE c.user_id = ?
               ORDER BY h.hearing_date ASC LIMIT ? OFFSET ?""",
            (user_id, limit, skip)
        )
        hearings = await cursor.fetchall()
        return [dict(hearing) for hearing in hearings]
