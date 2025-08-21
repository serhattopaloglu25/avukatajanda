from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import aiosqlite
from database import init_db

# Güvenlik
security = HTTPBearer()

# Veritabanı başlatma
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Uygulama başlatılırken
    await init_db()
    print("Avukat Ajanda uygulaması başlatıldı!")
    yield
    # Uygulama kapatılırken
    print("Uygulama kapatılıyor...")

# FastAPI uygulaması
app = FastAPI(
    title="Avukat Ajanda Sistemi",
    description="Avukatlar için kapsamlı ajanda ve müşteri yönetim sistemi",
    version="1.0.0",
    lifespan=lifespan
)

# CORS ayarları (Frontend için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production'da spesifik domain'ler kullanın
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Veritabanı bağlantı helper'ı
async def get_db():
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        yield db

# Ana sayfa
@app.get("/")
async def root():
    return {
        "message": "Avukat Ajanda Sistemi API'sine hoş geldiniz!",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "health": "/health"
        }
    }

# Sağlık kontrol endpoint'i
@app.get("/health")
async def health_check():
    try:
        async with aiosqlite.connect("avukat.db") as db:
            await db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": "2024-08-21"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Veritabanı bağlantı hatası: {str(e)}"
        )

# Test endpoint'i - Kullanıcıları listele (geçici)
@app.get("/test/users")
async def list_users(db: aiosqlite.Connection = Depends(get_db)):
    try:
        cursor = await db.execute("SELECT id, username, email, is_active, created_at FROM users")
        users = await cursor.fetchall()
        return {
            "users": [dict(user) for user in users],
            "count": len(users)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Kullanıcılar getirilirken hata: {str(e)}"
        )

# Test endpoint'i - Müşterileri listele (geçici)
@app.get("/test/clients")
async def list_clients(db: aiosqlite.Connection = Depends(get_db)):
    try:
        cursor = await db.execute("SELECT * FROM clients")
        clients = await cursor.fetchall()
        return {
            "clients": [dict(client) for client in clients],
            "count": len(clients)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Müşteriler getirilirken hata: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
