from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "User"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    passwordHash = Column(String, nullable=False)
    name = Column(String)
    role = Column(String, default="client")
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
    
    clients = relationship("Client", back_populates="user")
    cases = relationship("Case", back_populates="user")

class Client(Base):
    __tablename__ = "Client"
    
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"))
    name = Column(String, nullable=False)
    email = Column(String)
    phone = Column(String)
    address = Column(Text)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="clients")
    cases = relationship("Case", back_populates="client")

class Case(Base):
    __tablename__ = "Case"
    
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"))
    clientId = Column(Integer, ForeignKey("Client.id"))
    caseNumber = Column(String)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="active")
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="cases")
    client = relationship("Client", back_populates="cases")
    events = relationship("Event", back_populates="case")

class Event(Base):
    __tablename__ = "Event"
    
    id = Column(Integer, primary_key=True, index=True)
    caseId = Column(Integer, ForeignKey("Case.id"))
    title = Column(String, nullable=False)
    description = Column(Text)
    eventDate = Column(DateTime)
    eventType = Column(String)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now())
    
    case = relationship("Case", back_populates="events")
