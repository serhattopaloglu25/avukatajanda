from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr
import aiosqlite

# JWT ayarları
SECRET_KEY = "avukat-ajanda-secret-key-2024"  # Production'da environment variable kullanın
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Şifre hashleme
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Pydantic modelleri
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    created_at: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    username: Optional[str] = None

# Şifre yardımcı fonksiyonları
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Düz şifre ile hash'lenmiş şifreyi karşılaştır"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Şifreyi hash'le"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """JWT access token oluştur"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Veritabanı işlemleri
async def get_user_by_username(username: str):
    """Kullanıcı adına göre kullanıcı getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM users WHERE username = ?", (username,)
        )
        user = await cursor.fetchone()
        return dict(user) if user else None

async def get_user_by_email(email: str):
    """Email'e göre kullanıcı getir"""
    async with aiosqlite.connect("avukat.db") as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM users WHERE email = ?", (email,)
        )
        user = await cursor.fetchone()
        return dict(user) if user else None

async def create_user(user_data: UserCreate):
    """Yeni kullanıcı oluştur"""
    # Kullanıcı adı kontrolü
    existing_user = await get_user_by_username(user_data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu kullanıcı adı zaten kullanılıyor"
        )
    
    # Email kontrolü
    existing_email = await get_user_by_email(user_data.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu email adresi zaten kullanılıyor"
        )
    
    # Şifreyi hash'le
    hashed_password = get_password_hash(user_data.password)
    
    # Veritabanına kaydet
    async with aiosqlite.connect("avukat.db") as db:
        cursor = await db.execute(
            """INSERT INTO users (username, email, hashed_password) 
               VALUES (?, ?, ?)""",
            (user_data.username, user_data.email, hashed_password)
        )
        await db.commit()
        
        # Oluşturulan kullanıcıyı getir
        user_id = cursor.lastrowid
        
        # Row factory'yi ayarla
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM users WHERE id = ?", (user_id,)
        )
        new_user = await cursor.fetchone()
        
        if new_user:
            return dict(new_user)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Kullanıcı oluşturulamadı"
            )

async def authenticate_user(username: str, password: str):
    """Kullanıcı doğrulama"""
    user = await get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """JWT token'dan mevcut kullanıcıyı getir"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Geçersiz kimlik bilgileri",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = await get_user_by_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: dict = Depends(get_current_user)):
    """Aktif kullanıcıyı getir"""
    if not current_user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Pasif kullanıcı"
        )
    return current_user
