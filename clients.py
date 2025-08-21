from typing import Optional
from pydantic import BaseModel, EmailStr
from fastapi import HTTPException, status
import aiosqlite

class ClientCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: str

async def create_client(client_data: ClientCreate):
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            "INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)",
            (client_data.name, client_data.email, client_data.phone, client_data.address)
        )
        await db.commit()
        
        client_id = cursor.lastrowid
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM clients WHERE id = ?", (client_id,))
        new_client = await cursor.fetchone()
        return dict(new_client) if new_client else None

async def get_client_by_id(client_id: int):
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM clients WHERE id = ?", (client_id,))
        client = await cursor.fetchone()
        return dict(client) if client else None

async def get_all_clients(skip: int = 0, limit: int = 100):
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM clients ORDER BY created_at DESC LIMIT ? OFFSET ?", 
            (limit, skip)
        )
        clients = await cursor.fetchall()
        return [dict(client) for client in clients]

async def search_clients(query: str):
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        search_pattern = f"%{query}%"
        cursor = await db.execute(
            "SELECT * FROM clients WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? ORDER BY created_at DESC",
            (search_pattern, search_pattern, search_pattern)
        )
        clients = await cursor.fetchall()
        return [dict(client) for client in clients]

async def update_client(client_id: int, client_data: ClientUpdate):
    existing_client = await get_client_by_id(client_id)
    if not existing_client:
        raise HTTPException(status_code=404, detail="Müşteri bulunamadı")
    
    update_data = client_data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="Güncellenecek alan belirtilmedi")
    
    set_clause = ", ".join([f"{key} = ?" for key in update_data.keys()])
    values = list(update_data.values()) + [client_id]
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute(f"UPDATE clients SET {set_clause} WHERE id = ?", values)
        await db.commit()
        return await get_client_by_id(client_id)

async def delete_client(client_id: int):
    existing_client = await get_client_by_id(client_id)
    if not existing_client:
        raise HTTPException(status_code=404, detail="Müşteri bulunamadı")
    
    async with aiosqlite.connect("avukat.db") as db:
        await db.execute("DELETE FROM clients WHERE id = ?", (client_id,))
        await db.commit()
        return {"message": "Müşteri başarıyla silindi"}

async def get_client_count():
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute("SELECT COUNT(*) as count FROM clients")
        result = await cursor.fetchone()
        return result[0] if result else 0