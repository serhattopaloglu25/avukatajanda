"""
SQLAlchemy Models - Matching existing Prisma schema
"""
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, ForeignKey, Float, JSON, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(255))
    role = Column(String(50), default="user")
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    organization = relationship("Organization", back_populates="users")
    clients = relationship("Client", back_populates="owner")
    cases = relationship("Case", back_populates="owner")
    events = relationship("Event", back_populates="owner")
    consents = relationship("UserConsent", back_populates="user")

class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(Text)
    phone = Column(String(50))
    tax_number = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="organization")

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(50))
    identity_number = Column(String(50))
    address = Column(Text)
    notes = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="clients")
    organization = relationship("Organization")
    cases = relationship("Case", back_populates="client")
    
    # Index for performance
    __table_args__ = (
        Index('idx_client_owner', 'owner_id'),
        Index('idx_client_org', 'organization_id'),
    )

class Case(Base):
    __tablename__ = "cases"
    
    id = Column(Integer, primary_key=True, index=True)
    case_number = Column(String(255), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(50), default="active")
    court_name = Column(String(255))
    judge_name = Column(String(255))
    opponent_name = Column(String(255))
    opponent_lawyer = Column(String(255))
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    client = relationship("Client", back_populates="cases")
    owner = relationship("User", back_populates="cases")
    organization = relationship("Organization")
    events = relationship("Event", back_populates="case")
    
    # Index for performance
    __table_args__ = (
        Index('idx_case_owner', 'owner_id'),
        Index('idx_case_client', 'client_id'),
        Index('idx_case_number', 'case_number'),
    )

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    event_type = Column(String(50), default="hearing")
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True))
    location = Column(String(255))
    reminder = Column(Boolean, default=False)
    reminder_minutes = Column(Integer, default=60)
    case_id = Column(Integer, ForeignKey("cases.id"))
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    case = relationship("Case", back_populates="events")
    owner = relationship("User", back_populates="events")
    organization = relationship("Organization")
    
    # Index for performance
    __table_args__ = (
        Index('idx_event_owner', 'owner_id'),
        Index('idx_event_date', 'start_date'),
        Index('idx_event_case', 'case_id'),
    )

class UserConsent(Base):
    __tablename__ = "user_consents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    kvkk = Column(Boolean, default=False)
    aydinlatma = Column(Boolean, default=False)
    uyelik = Column(Boolean, default=False)
    consent_date = Column(DateTime(timezone=True), server_default=func.now())
    ip_address = Column(String(50))
    user_agent = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="consents")
    
    # Index
    __table_args__ = (
        Index('idx_consent_user', 'user_id'),
    )
