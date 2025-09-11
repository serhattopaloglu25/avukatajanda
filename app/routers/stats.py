"""
Statistics and dashboard routes
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app import models, schemas, auth
from app.db import get_db

router = APIRouter()

@router.get("/", response_model=schemas.StatsResponse)
async def get_stats(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics for the current user"""
    
    # Base query filter for user/organization
    user_filter = models.Client.owner_id == current_user.id
    
    # Get client statistics
    total_clients = db.query(func.count(models.Client.id)).filter(
        user_filter
    ).scalar() or 0
    
    # Get case statistics
    total_cases = db.query(func.count(models.Case.id)).filter(
        models.Case.owner_id == current_user.id
    ).scalar() or 0
    
    active_cases = db.query(func.count(models.Case.id)).filter(
        models.Case.owner_id == current_user.id,
        models.Case.status == "active"
    ).scalar() or 0
    
    # Get event statistics
    total_events = db.query(func.count(models.Event.id)).filter(
        models.Event.owner_id == current_user.id
    ).scalar() or 0
    
    # Get upcoming events (next 7 days)
    now = datetime.now()
    week_later = now + timedelta(days=7)
    
    upcoming_events = db.query(func.count(models.Event.id)).filter(
        models.Event.owner_id == current_user.id,
        models.Event.start_date >= now,
        models.Event.start_date <= week_later
    ).scalar() or 0
    
    return {
        "total_clients": total_clients,
        "total_cases": total_cases,
        "active_cases": active_cases,
        "total_events": total_events,
        "upcoming_events": upcoming_events
    }

@router.get("/summary")
async def get_detailed_stats(
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get detailed dashboard statistics"""
    
    # Basic stats
    basic_stats = await get_stats(current_user, db)
    
    # Cases by status
    cases_by_status = db.query(
        models.Case.status,
        func.count(models.Case.id).label("count")
    ).filter(
        models.Case.owner_id == current_user.id
    ).group_by(models.Case.status).all()
    
    # Events by type
    events_by_type = db.query(
        models.Event.event_type,
        func.count(models.Event.id).label("count")
    ).filter(
        models.Event.owner_id == current_user.id
    ).group_by(models.Event.event_type).all()
    
    # Recent clients (last 5)
    recent_clients = db.query(models.Client).filter(
        models.Client.owner_id == current_user.id
    ).order_by(models.Client.created_at.desc()).limit(5).all()
    
    # Recent cases (last 5)
    recent_cases = db.query(models.Case).filter(
        models.Case.owner_id == current_user.id
    ).order_by(models.Case.created_at.desc()).limit(5).all()
    
    # Upcoming events (next 5)
    upcoming_events = db.query(models.Event).filter(
        models.Event.owner_id == current_user.id,
        models.Event.start_date >= datetime.now()
    ).order_by(models.Event.start_date).limit(5).all()
    
    return {
        **basic_stats,
        "cases_by_status": [
            {"status": status, "count": count}
            for status, count in cases_by_status
        ],
        "events_by_type": [
            {"type": event_type, "count": count}
            for event_type, count in events_by_type
        ],
        "recent_clients": [
            {
                "id": client.id,
                "name": client.name,
                "email": client.email,
                "created_at": client.created_at
            }
            for client in recent_clients
        ],
        "recent_cases": [
            {
                "id": case.id,
                "case_number": case.case_number,
                "title": case.title,
                "status": case.status,
                "created_at": case.created_at
            }
            for case in recent_cases
        ],
        "upcoming_events": [
            {
                "id": event.id,
                "title": event.title,
                "event_type": event.event_type,
                "start_date": event.start_date,
                "location": event.location
            }
            for event in upcoming_events
        ]
    }

@router.get("/monthly")
async def get_monthly_stats(
    year: int = None,
    month: int = None,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get monthly statistics"""
    
    # Default to current month if not specified
    if not year or not month:
        now = datetime.now()
        year = now.year
        month = now.month
    
    # Calculate date range for the month
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)
    
    # New clients this month
    new_clients = db.query(func.count(models.Client.id)).filter(
        models.Client.owner_id == current_user.id,
        models.Client.created_at >= start_date,
        models.Client.created_at < end_date
    ).scalar() or 0
    
    # New cases this month
    new_cases = db.query(func.count(models.Case.id)).filter(
        models.Case.owner_id == current_user.id,
        models.Case.created_at >= start_date,
        models.Case.created_at < end_date
    ).scalar() or 0
    
    # Events this month
    month_events = db.query(func.count(models.Event.id)).filter(
        models.Event.owner_id == current_user.id,
        models.Event.start_date >= start_date,
        models.Event.start_date < end_date
    ).scalar() or 0
    
    return {
        "year": year,
        "month": month,
        "new_clients": new_clients,
        "new_cases": new_cases,
        "month_events": month_events,
        "period": f"{year}-{month:02d}"
    }
