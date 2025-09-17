from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Event
from app.schemas import EventCreate, EventResponse
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
async def get_events(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    events = db.query(Event).join(Event.case).filter(
        Event.case.has(userId=current_user.id)
    ).all()
    return events

@router.post("/", response_model=EventResponse)
async def create_event(
    event_data: EventCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # TODO: Verify case belongs to user
    event = Event(**event_data.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
