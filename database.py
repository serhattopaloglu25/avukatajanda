from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String

DATABASE_URL = "sqlite+aiosqlite:///./emails.db"

engine = create_async_engine(DATABASE_URL, echo=True)
Base = declarative_base()

async_session = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, unique=True, index=True)

# Tabloyu oluşturmak için başlangıçta bir defa çalışır
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
