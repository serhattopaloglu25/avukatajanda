"""
Case management routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app import models, schemas, auth
from app.db import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.CaseResponse])
async def get_cases(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[str] = None,
    client_id: Optional[int] = None,
    search: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all cases for the current user/organization"""
    
    query = db.query(models.Case).options(
        joinedload(models.Case.client)
    ).filter(
        models.Case.owner_id == current_user.id
    )
    
    # Add organization filter if user belongs to one
    if current_user.organization_id:
        query = query.filter(
            models.Case.organization_id == current_user.organization_id
        )
    
    # Add status filter if provided
    if status:
        query = query.filter(models.Case.status == status)
    
    # Add client filter if provided
    if client_id:
        query = query.filter(models.Case.client_id == client_id)
    
    # Add search filter if provided
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Case.case_number.ilike(search_filter)) |
            (models.Case.title.ilike(search_filter)) |
            (models.Case.court_name.ilike(search_filter))
        )
    
    cases = query.offset(skip).limit(limit).all()
    return cases

@router.post("/", response_model=schemas.CaseResponse)
async def create_case(
    case: schemas.CaseCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new case"""
    
    # Verify client belongs to user
    client = db.query(models.Client).filter(
        models.Client.id == case.client_id,
        models.Client.owner_id == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found or does not belong to you"
        )
    
    # Check if case number already exists
    existing_case = db.query(models.Case).filter(
        models.Case.case_number == case.case_number
    ).first()
    
    if existing_case:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Case number already exists"
        )
    
    db_case = models.Case(
        **case.model_dump(),
        owner_id=current_user.id,
        organization_id=current_user.organization_id
    )
    
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    
    # Load client relationship
    db_case = db.query(models.Case).options(
        joinedload(models.Case.client)
    ).filter(models.Case.id == db_case.id).first()
    
    return db_case

@router.get("/{case_id}", response_model=schemas.CaseResponse)
async def get_case(
    case_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific case by ID"""
    
    case = db.query(models.Case).options(
        joinedload(models.Case.client)
    ).filter(
        models.Case.id == case_id,
        models.Case.owner_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    return case

@router.put("/{case_id}", response_model=schemas.CaseResponse)
async def update_case(
    case_id: int,
    case_update: schemas.CaseUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a case"""
    
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.owner_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    # If client_id is being updated, verify new client
    if case_update.client_id:
        client = db.query(models.Client).filter(
            models.Client.id == case_update.client_id,
            models.Client.owner_id == current_user.id
        ).first()
        
        if not client:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="New client not found or does not belong to you"
            )
    
    # Update only provided fields
    update_data = case_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(case, field, value)
    
    db.commit()
    db.refresh(case)
    
    # Load client relationship
    case = db.query(models.Case).options(
        joinedload(models.Case.client)
    ).filter(models.Case.id == case_id).first()
    
    return case

@router.delete("/{case_id}")
async def delete_case(
    case_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a case"""
    
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.owner_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    # Delete related events first
    db.query(models.Event).filter(
        models.Event.case_id == case_id
    ).delete()
    
    db.delete(case)
    db.commit()
    
    return {"message": "Case deleted successfully"}

@router.get("/{case_id}/events", response_model=List[schemas.EventResponse])
async def get_case_events(
    case_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all events for a specific case"""
    
    # Verify case belongs to user
    case = db.query(models.Case).filter(
        models.Case.id == case_id,
        models.Case.owner_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    events = db.query(models.Event).filter(
        models.Event.case_id == case_id,
        models.Event.owner_id == current_user.id
    ).order_by(models.Event.start_date).all()
    
    return events
