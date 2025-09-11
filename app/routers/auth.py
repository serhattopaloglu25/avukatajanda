"""
Authentication routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app import models, schemas, auth
from app.db import get_db

router = APIRouter()

@router.post("/register", response_model=schemas.UserWithToken)
async def register(
    user_data: schemas.UserCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Register a new user with consent tracking"""
    
    # Check if consents are provided and valid
    if not user_data.consents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Consent information is required"
        )
    
    required_consents = ["kvkk", "aydinlatma", "uyelik"]
    for consent in required_consents:
        if not user_data.consents.get(consent, False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{consent.upper()} consent is required"
            )
    
    # Check if user already exists
    existing_user = db.query(models.User).filter(
        models.User.email == user_data.email
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = auth.get_password_hash(user_data.password)
    db_user = models.User(
        email=user_data.email,
        password=hashed_password,
        name=user_data.name,
        role=user_data.role or "user"
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create consent records
    auth.create_user_consents(
        db=db,
        user_id=db_user.id,
        consents=user_data.consents,
        request=request
    )
    
    # Create access token
    access_token = auth.create_access_token(
        data={"sub": db_user.email, "user_id": db_user.id}
    )
    
    return {
        **schemas.UserResponse.model_validate(db_user).model_dump(),
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=schemas.Token)
async def login(
    user_credentials: schemas.UserLogin,
    db: Session = Depends(get_db)
):
    """Login with email and password"""
    
    user = auth.authenticate_user(
        db=db,
        email=user_credentials.email,
        password=user_credentials.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = auth.create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """OAuth2 compatible token endpoint"""
    
    user = auth.authenticate_user(
        db=db,
        email=form_data.username,  # OAuth2 uses username field for email
        password=form_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = auth.create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user_info(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Get current user information"""
    return current_user

@router.post("/logout")
async def logout():
    """Logout endpoint (client should discard token)"""
    return {"message": "Successfully logged out"}

@router.post("/refresh", response_model=schemas.Token)
async def refresh_token(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    """Refresh access token"""
    
    # Create new access token
    access_token = auth.create_access_token(
        data={"sub": current_user.email, "user_id": current_user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
