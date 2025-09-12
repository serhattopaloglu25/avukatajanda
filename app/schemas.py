"""
Pydantic schemas for request/response validation (v1 compatible)
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Base config for ORM models
class ORMBase(BaseModel):
    class Config:
        orm_mode = True

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    role: Optional[str] = "user"

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    consents: Dict[str, bool] = Field(...)
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase, ORMBase):
    id: int
    organization_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserWithToken(UserResponse):
    access_token: str
    token_type: str = "bearer"

# Organization schemas
class OrganizationBase(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    tax_number: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationResponse(OrganizationBase, ORMBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

# Client schemas
class ClientBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    identity_number: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    identity_number: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

class ClientResponse(ClientBase, ORMBase):
    id: int
    owner_id: int
    organization_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

# Case schemas
class CaseBase(BaseModel):
    case_number: str
    title: str
    description: Optional[str] = None
    status: Optional[str] = "active"
    court_name: Optional[str] = None
    judge_name: Optional[str] = None
    opponent_name: Optional[str] = None
    opponent_lawyer: Optional[str] = None
    client_id: int

class CaseCreate(CaseBase):
    pass

class CaseUpdate(BaseModel):
    case_number: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    court_name: Optional[str] = None
    judge_name: Optional[str] = None
    opponent_name: Optional[str] = None
    opponent_lawyer: Optional[str] = None
    client_id: Optional[int] = None

class CaseResponse(CaseBase, ORMBase):
    id: int
    owner_id: int
    organization_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    client: Optional[ClientResponse] = None

# Event schemas
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    event_type: Optional[str] = "hearing"
    start_date: datetime
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    reminder: Optional[bool] = False
    reminder_minutes: Optional[int] = 60
    case_id: Optional[int] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_type: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    reminder: Optional[bool] = None
    reminder_minutes: Optional[int] = None
    case_id: Optional[int] = None

class EventResponse(EventBase, ORMBase):
    id: int
    owner_id: int
    organization_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    case: Optional[CaseResponse] = None

# Stats schemas
class StatsResponse(BaseModel):
    total_clients: int
    total_cases: int
    active_cases: int
    total_events: int
    upcoming_events: int
    
# Health check schemas
class HealthResponse(BaseModel):
    status: str
    database: str
    version: Optional[str] = "2.0.0"

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None

# Consent schemas
class ConsentCreate(BaseModel):
    kvkk: bool
    aydinlatma: bool
    uyelik: bool
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class ConsentResponse(ORMBase):
    id: int
    user_id: int
    kvkk: bool
    aydinlatma: bool
    uyelik: bool
    consent_date: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
