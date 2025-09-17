from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Client
from app.schemas import ClientCreate, ClientResponse
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[ClientResponse])
async def get_clients(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    clients = db.query(Client).filter(Client.userId == current_user.id).all()
    return clients

@router.post("/", response_model=ClientResponse)
async def create_client(
    client_data: ClientCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client = Client(
        **client_data.dict(),
        userId=current_user.id
    )
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@router.get("/{client_id}", response_model=ClientResponse)
async def get_client(
    client_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client = db.query(Client).filter(
        Client.id == client_id,
        Client.userId == current_user.id
    ).first()
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return client
