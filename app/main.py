"""
AvukatAjanda Backend API - FastAPI Application
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.db import engine, Base, get_db
from app.routers import auth, clients, cases, stats, events
from sqlalchemy import text

# Load environment variables
load_dotenv()

# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown
    pass

app = FastAPI(
    title="AvukatAjanda API",
    description="Legal Practice Management System API",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(clients.router, prefix="/api/clients", tags=["Clients"])
app.include_router(cases.router, prefix="/api/cases", tags=["Cases"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(stats.router, prefix="/api/stats", tags=["Statistics"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "AvukatAjanda API",
        "version": "2.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        from app.db import SessionLocal
        db = SessionLocal()
        result = db.execute(text("SELECT 1"))
        result.fetchone()
        db.close()
        
        return {
            "status": "healthy",
            "database": "connected",
            "version": "2.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail={
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        })

@app.get("/api/health")
async def api_health():
    """Alternative health endpoint for compatibility"""
    return await health_check()
