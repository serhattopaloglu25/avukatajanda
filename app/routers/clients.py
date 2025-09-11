"""
Client management routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas, auth
from app.db import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.ClientResponse])
async def get_clients(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all clients for the current user/organization"""
    
    query = db.query(models.Client).filter(
        models.Client.owner_id == current_user.id
    )
    
    # Add organization filter if user belongs to one
    if current_user.organization_id:
        query = query.filter(
            models.Client.organization_id == current_user.organization_id
        )
    
    # Add search filter if provided
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.Client.name.ilike(search_filter)) |
            (models.Client.email.ilike(search_filter)) |
            (models.Client.phone.ilike(search_filter))
        )
    
    clients = query.offset(skip).limit(limit).all()
    return clients

@router.post("/", response_model=schemas.ClientResponse)
async def create_client(
    client: schemas.ClientCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new client"""
    
    db_client = models.Client(
        **client.model_dump(),
        owner_id=current_user.id,
        organization_id=current_user.organization_id
    )
    
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    
    return db_client

@router.get("/{client_id}", response_model=schemas.ClientResponse)
async def get_client(
    client_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific client by ID"""
    
    client = db.query(models.Client).filter(
        models.Client.id == client_id,
        models.Client.owner_id == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    return client

@router.put("/{client_id}", response_model=schemas.ClientResponse)
async def update_client(
    client_id: int,
    client_update: schemas.ClientUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a client"""
    
    client = db.query(models.Client).filter(
        models.Client.id == client_id,
        models.Client.owner_id == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    # Update only provided fields
    update_data = client_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(client, field, value)
    
    db.commit()
    db.refresh(client)
    
    return client

@router.delete("/{client_id}")
async def delete_client(
    client_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a client"""
    
    client = db.query(models.Client).filter(
        models.Client.id == client_id,
        models.Client.owner_id == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    # Check if client has cases
    cases_count = db.query(models.Case).filter(
        models.Case.client_id == client_id
    ).count()
    
    if cases_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot delete client with {cases_count} active cases"
        )
    
    db.delete(client)
    db.commit()
    
    return {"message": "Client deleted successfully"}

@router.get("/{client_id}/cases", response_model=List[schemas.CaseResponse])
async def get_client_cases(
    client_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all cases for a specific client"""
    
    # Verify client belongs to user
    client = db.query(models.Client).filter(
        models.Client.id == client_id,
        models.Client.owner_id == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    cases = db.query(models.Case).filter(
        models.Case.client_id == client_id,
        models.Case.owner_id == current_user.id
    ).all()
    
    return cases
