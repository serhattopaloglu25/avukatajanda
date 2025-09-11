"""Test authentication endpoints"""

def test_register_user(client, test_user):
    """Test user registration"""
    response = client.post("/auth/register", json=test_user)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user["email"]
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_register_duplicate_user(client, test_user):
    """Test duplicate user registration"""
    # Register first user
    client.post("/auth/register", json=test_user)
    
    # Try to register same user
    response = client.post("/auth/register", json=test_user)
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()

def test_register_without_consents(client):
    """Test registration without consents"""
    user_data = {
        "email": "noconsent@example.com",
        "password": "Test1234!",
        "name": "No Consent User",
        "consents": {}
    }
    response = client.post("/auth/register", json=user_data)
    assert response.status_code == 400

def test_login_user(client, test_user):
    """Test user login"""
    # Register user first
    client.post("/auth/register", json=test_user)
    
    # Login
    login_data = {
        "email": test_user["email"],
        "password": test_user["password"]
    }
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    login_data = {
        "email": "nonexistent@example.com",
        "password": "WrongPassword"
    }
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == 401

def test_get_current_user(client, auth_headers):
    """Test getting current user info"""
    response = client.get("/auth/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "email" in data
    assert "id" in data

def test_get_current_user_unauthorized(client):
    """Test getting current user without auth"""
    response = client.get("/auth/me")
    assert response.status_code == 401
