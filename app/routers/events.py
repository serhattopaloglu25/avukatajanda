"""
Event/Calendar management routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from datetime import datetime, date
from app import models, schemas, auth
from app.db import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.EventResponse])
async def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    case_id: Optional[int] = None,
    event_type: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all events for the current user/organization"""
    
    query = db.query(models.Event).options(
        joinedload(models.Event.case).joinedload(models.Case.client)
    ).filter(
        models.Event.owner_id == current_user.id
    )
    
    # Add organization filter if user belongs to one
    if current_user.organization_id:
        query = query.filter(
            models.Event.organization_id == current_user.organization_id
        )
    
    # Add date range filter
    if start_date:
        query = query.filter(models.Event.start_date >= start_date)
    if end_date:
        query = query.filter(models.Event.start_date <= end_date)
    
    # Add case filter
    if case_id:
        query = query.filter(models.Event.case_id == case_id)
    
    # Add event type filter
    if event_type:
        query = query.filter(models.Event.event_type == event_type)
    
    events = query.order_by(models.Event.start_date).offset(skip).limit(limit).all()
    return events

@router.post("/", response_model=schemas.EventResponse)
async def create_event(
    event: schemas.EventCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new event"""
    
    # If case_id is provided, verify it belongs to user
    if event.case_id:
        case = db.query(models.Case).filter(
            models.Case.id == event.case_id,
            models.Case.owner_id == current_user.id
        ).first()
        
        if not case:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case not found or does not belong to you"
            )
    
    db_event = models.Event(
        **event.model_dump(),
        owner_id=current_user.id,
        organization_id=current_user.organization_id
    )
    
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    # Load relationships
    db_event = db.query(models.Event).options(
        joinedload(models.Event.case).joinedload(models.Case.client)
    ).filter(models.Event.id == db_event.id).first()
    
    return db_event

@router.get("/upcoming", response_model=List[schemas.EventResponse])
async def get_upcoming_events(
    days: int = Query(7, ge=1, le=30),
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get upcoming events for the next N days"""
    
    from datetime import timedelta
    
    now = datetime.now()
    end_date = now + timedelta(days=days)
    
    events = db.query(models.Event).options(
        joinedload(models.Event.case).joinedload(models.Case.client)
    ).filter(
        models.Event.owner_id == current_user.id,
        models.Event.start_date >= now,
        models.Event.start_date <= end_date
    ).order_by(models.Event.start_date).all()
    
    return events

@router.get("/{event_id}", response_model=schemas.EventResponse)
async def get_event(
    event_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific event by ID"""
    
    event = db.query(models.Event).options(
        joinedload(models.Event.case).joinedload(models.Case.client)
    ).filter(
        models.Event.id == event_id,
        models.Event.owner_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return event

@router.put("/{event_id}", response_model=schemas.EventResponse)
async def update_event(
    event_id: int,
    event_update: schemas.EventUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update an event"""
    
    event = db.query(models.Event).filter(
        models.Event.id == event_id,
        models.Event.owner_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # If case_id is being updated, verify new case
    if event_update.case_id is not None:
        if event_update.case_id:  # If not null
            case = db.query(models.Case).filter(
                models.Case.id == event_update.case_id,
                models.Case.owner_id == current_user.id
            ).first()
            
            if not case:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="New case not found or does not belong to you"
                )
    
    # Update only provided fields
    update_data = event_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(event, field, value)
    
    db.commit()
    db.refresh(event)
    
    # Load relationships
    event = db.query(models.Event).options(
        joinedload(models.Event.case).joinedload(models.Case.client)
    ).filter(models.Event.id == event_id).first()
    
    return event

@router.delete("/{event_id}")
async def delete_event(
    event_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete an event"""
    
    event = db.query(models.Event).filter(
        models.Event.id == event_id,
        models.Event.owner_id == current_user.id
    ).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    db.delete(event)
    db.commit()
    
    return {"message": "Event deleted successfully"}
