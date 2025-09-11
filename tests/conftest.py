"""Test configuration and fixtures"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db import Base, get_db
from app.auth import get_password_hash
import os

# Test database URL
TEST_DATABASE_URL = "sqlite:///./test.db"

# Create test engine
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    """Override database dependency for testing"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Override the dependency
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def client():
    """Create test client"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    with TestClient(app) as test_client:
        yield test_client
    
    # Drop tables after tests
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def test_user():
    """Create test user data"""
    return {
        "email": "test@example.com",
        "password": "Test1234!",
        "name": "Test User",
        "consents": {
            "kvkk": True,
            "aydinlatma": True,
            "uyelik": True
        }
    }

@pytest.fixture
def auth_headers(client, test_user):
    """Get authentication headers"""
    response = client.post("/auth/register", json=test_user)
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
