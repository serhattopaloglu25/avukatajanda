from datetime import datetime, timedelta
from typing import Optional, List
from pydantic import BaseModel, Field
from fastapi import HTTPException, status
import aiosqlite

# Pydantic modelleri
class AppointmentCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    client_id: Optional[int] = None
    appointment_date: datetime
    duration_minutes: int = Field(default=60, ge=15, le=480)  # 15 dakika - 8 saat
    location: Optional[str] = None
    notes: Optional[str] = None

class AppointmentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    client_id: Optional[int] = None
    appointment_date: Optional[datetime] = None
    duration_minutes: Optional[int] = Field(None, ge=15, le=480)
    status: Optional[str] = Field(None, pattern="^(scheduled|confirmed|completed|cancelled)$")
    location: Optional[str] = None
    notes: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    client_id: Optional[int] = None
    client_name: Optional[str] = None
    user_id: int
    appointment_date: str
    duration_minutes: int
    status: str
    location: Optional[str] = None
    notes: Optional[str] = None
    created_at: str
    updated_at: str

class AppointmentCalendar(BaseModel):
    date: str
    appointments: List[AppointmentResponse]
    total_appointments: int

# Veritabanı işlemleri
async def create_appointment(appointment_data: AppointmentCreate, user_id: int):
    """Yeni randevu oluştur"""
    # Müşteri ID kontrolü (eğer belirtilmişse)
    if appointment_data.client_id:
        async with aiosqlite.connect("avukat.db") as db:
            cursor = await db.execute(
                "SELECT id FROM clients WHERE id = ?", (appointment_data.client_id,)
            )
            client = await cursor.fetchone()
            if not client:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Belirtilen müşteri bulunamadı"
                )
    
    # Çakışan randevu kontrolü
    await check_appointment_conflict(appointment_data.appointment_date, appointment_data.duration_minutes, user_id)
    
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """INSERT INTO appointments 
               (title, description, client_id, user_id, appointment_date, duration_minutes, location, notes) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                appointment_data.title,
                appointment_data.description,
                appointment_data.client_id,
                user_id,
                appointment_data.appointment_date.isoformat(),
                appointment_data.duration_minutes,
                appointment_data.location,
                appointment_data.notes
            )
        )
        await db.commit()
        
        # Oluşturulan randevuyu getir
        appointment_id = cursor.lastrowid
        return await get_appointment_by_id(appointment_id, user_id)

async def check_appointment_conflict(appointment_date: datetime, duration_minutes: int, user_id: int, exclude_appointment_id: Optional[int] = None):
    """Randevu çakışması kontrolü"""
    start_time = appointment_date
    end_time = appointment_date + timedelta(minutes=duration_minutes)
    
    async with aiosqlite.connect("avukat.db") as db:
        query = """
            SELECT id FROM appointments 
            WHERE user_id = ? AND status != 'cancelled' AND (
                (datetime(appointment_date) < datetime(?) AND 
                 datetime(appointment_date, '+' || duration_minutes || ' minutes') > datetime(?))
                OR
                (datetime(appointment_date) >= datetime(?) AND 
                 datetime(appointment_date) < datetime(?))
            )
        """
        params = [user_id, end_time.isoformat(), start_time.isoformat(), 
                 start_time.isoformat(), end_time.isoformat()]
        
        if exclude_appointment_id:
            query += " AND id != ?"
            params.append(exclude_appointment_id)
        
        cursor = await db.execute(query, params)
        conflict = await cursor.fetchone()
        
        if conflict:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Bu zaman diliminde başka bir randevunuz var: {start_time.strftime('%d.%m.%Y %H:%M')} - {end_time.strftime('%H:%M')}"
            )

async def get_appointment_by_id(appointment_id: int, user_id: int):
    """ID'ye göre randevu getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """SELECT a.*, c.name as client_name 
               FROM appointments a 
               LEFT JOIN clients c ON a.client_id = c.id 
               WHERE a.id = ? AND a.user_id = ?""",
            (appointment_id, user_id)
        )
        appointment = await cursor.fetchone()
        return dict(appointment) if appointment else None

async def get_user_appointments(user_id: int, skip: int = 0, limit: int = 100, status_filter: Optional[str] = None):
    """Kullanıcının randevularını getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        
        query = """SELECT a.*, c.name as client_name 
                   FROM appointments a 
                   LEFT JOIN clients c ON a.client_id = c.id 
                   WHERE a.user_id = ?"""
        params = [user_id]
        
        if status_filter:
            query += " AND a.status = ?"
            params.append(status_filter)
        
        query += " ORDER BY a.appointment_date ASC LIMIT ? OFFSET ?"
        params.extend([limit, skip])
        
        cursor = await db.execute(query, params)
        appointments = await cursor.fetchall()
        return [dict(appointment) for appointment in appointments]

async def get_appointments_by_date_range(user_id: int, start_date: datetime, end_date: datetime):
    """Tarih aralığındaki randevuları getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """SELECT a.*, c.name as client_name 
               FROM appointments a 
               LEFT JOIN clients c ON a.client_id = c.id 
               WHERE a.user_id = ? AND 
                     datetime(a.appointment_date) >= datetime(?) AND 
                     datetime(a.appointment_date) <= datetime(?)
               ORDER BY a.appointment_date ASC""",
            (user_id, start_date.isoformat(), end_date.isoformat())
        )
        appointments = await cursor.fetchall()
        return [dict(appointment) for appointment in appointments]

async def update_appointment(appointment_id: int, appointment_data: AppointmentUpdate, user_id: int):
    """Randevu güncelle"""
    # Randevunun var olup olmadığını kontrol et
    existing_appointment = await get_appointment_by_id(appointment_id, user_id)
    if not existing_appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Randevu bulunamadı"
        )
    
    # Güncellenecek alanları belirle
    update_data = appointment_data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Güncellenecek alan belirtilmedi"
        )
    
    # Tarih ve süre güncelleniyorsa çakışma kontrolü
    if 'appointment_date' in update_data or 'duration_minutes' in update_data:
        new_date = update_data.get('appointment_date', datetime.fromisoformat(existing_appointment['appointment_date']))
        new_duration = update_data.get('duration_minutes', existing_appointment['duration_minutes'])
        await check_appointment_conflict(new_date, new_duration, user_id, appointment_id)
    
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
    
    # Tarih güncellemesi için ISO format'a çevir
    if 'appointment_date' in update_data:
        update_data['appointment_date'] = update_data['appointment_date'].isoformat()
    
    # updated_at alanını ekle
    update_data['updated_at'] = datetime.now().isoformat()
    
    # SQL sorgusu oluştur
    set_clause = ", ".join([f"{key} = ?" for key in update_data.keys()])
    values = list(update_data.values()) + [appointment_id, user_id]
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute(
            f"UPDATE appointments SET {set_clause} WHERE id = ? AND user_id = ?",
            values
        )
        await db.commit()
        
        # Güncellenmiş randevuyu getir
        return await get_appointment_by_id(appointment_id, user_id)

async def delete_appointment(appointment_id: int, user_id: int):
    """Randevuyu sil"""
    # Randevunun var olup olmadığını kontrol et
    existing_appointment = await get_appointment_by_id(appointment_id, user_id)
    if not existing_appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Randevu bulunamadı"
        )
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute("DELETE FROM appointments WHERE id = ? AND user_id = ?", (appointment_id, user_id))
        await db.commit()
        return {"message": "Randevu başarıyla silindi"}

async def get_appointment_statistics(user_id: int):
    """Randevu istatistikleri"""
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
                SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN datetime(appointment_date) >= datetime('now') THEN 1 ELSE 0 END) as upcoming
               FROM appointments WHERE user_id = ?""",
            (user_id,)
        )
        stats = await cursor.fetchone()
        return dict(stats) if stats else {}

async def search_appointments(user_id: int, query: str):
    """Randevu arama"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        search_pattern = f"%{query}%"
        cursor = await db.execute(
            """SELECT a.*, c.name as client_name 
               FROM appointments a 
               LEFT JOIN clients c ON a.client_id = c.id 
               WHERE a.user_id = ? AND (
                   a.title LIKE ? OR 
                   a.description LIKE ? OR 
                   a.location LIKE ? OR 
                   a.notes LIKE ? OR 
                   c.name LIKE ?
               )
               ORDER BY a.appointment_date DESC""",
            (user_id, search_pattern, search_pattern, search_pattern, search_pattern, search_pattern)
        )
        appointments = await cursor.fetchall()
        return [dict(appointment) for appointment in appointments]
