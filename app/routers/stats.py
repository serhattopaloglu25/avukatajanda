from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import get_db
from app.models import Client, Case, Event
from app.schemas import StatsResponse
from app.auth import get_current_user

router = APIRouter()

@router.get("/stats", response_model=StatsResponse)
async def get_stats(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    total_clients = db.query(Client).filter(Client.userId == current_user.id).count()
    total_cases = db.query(Case).filter(Case.userId == current_user.id).count()
    active_cases = db.query(Case).filter(
        Case.userId == current_user.id,
        Case.status == "active"
    ).count()
    
    # Upcoming events (next 30 days)
    upcoming_events = db.query(Event).join(Event.case).filter(
        Event.case.has(userId=current_user.id),
        Event.eventDate >= datetime.now(),
        Event.eventDate <= datetime.now() + timedelta(days=30)
    ).count()
    
    return {
        "total_clients": total_clients,
        "total_cases": total_cases,
        "active_cases": active_cases,
        "upcoming_events": upcoming_events
    }

@router.get("/dashboard/stats")
async def dashboard_stats(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Alias for stats endpoint"""
    return await get_stats(current_user, db)
