"""
Authentication utilities and JWT handling
"""
import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db import get_db
from app import models, schemas
from dotenv import load_dotenv

load_dotenv()

# Security settings
SECRET_KEY = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> schemas.TokenData:
    """Verify and decode a JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        
        if email is None:
            raise credentials_exception
            
        token_data = schemas.TokenData(email=email, user_id=user_id)
        return token_data
    except JWTError:
        raise credentials_exception

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    """Get the current authenticated user"""
    token_data = verify_token(token)
    
    user = db.query(models.User).filter(
        models.User.email == token_data.email
    ).first()
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user

async def get_current_active_user(
    current_user: models.User = Depends(get_current_user)
) -> models.User:
    """Ensure the current user is active"""
    # Add any additional checks here (e.g., user.is_active)
    return current_user

def authenticate_user(db: Session, email: str, password: str) -> Optional[models.User]:
    """Authenticate a user by email and password"""
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    
    return user

def create_user_consents(
    db: Session,
    user_id: int,
    consents: dict,
    request: Optional[Request] = None
) -> models.UserConsent:
    """Create user consent records"""
    ip_address = None
    user_agent = None
    
    if request:
        # Get IP address from request
        ip_address = request.client.host if request.client else None
        # Get user agent from headers
        user_agent = request.headers.get("user-agent")
    
    consent_record = models.UserConsent(
        user_id=user_id,
        kvkk=consents.get("kvkk", False),
        aydinlatma=consents.get("aydinlatma", False),
        uyelik=consents.get("uyelik", False),
        ip_address=ip_address,
        user_agent=user_agent
    )
    
    db.add(consent_record)
    db.commit()
    db.refresh(consent_record)
    
    return consent_record
