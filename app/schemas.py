from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    consents: Optional[dict] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

# User Schemas  
class UserBase(BaseModel):
    email: str
    name: Optional[str] = None

class UserResponse(UserBase):
    id: int
    role: str
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Client Schemas
class ClientCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientResponse(ClientCreate):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Case Schemas
class CaseCreate(BaseModel):
    title: str
    clientId: int
    caseNumber: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = "active"

class CaseResponse(CaseCreate):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Event Schemas
class EventCreate(BaseModel):
    title: str
    caseId: int
    description: Optional[str] = None
    eventDate: Optional[datetime] = None
    eventType: Optional[str] = None

class EventResponse(EventCreate):
    id: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Stats Schema
class StatsResponse(BaseModel):
    total_clients: int
    total_cases: int
    active_cases: int
    upcoming_events: int
