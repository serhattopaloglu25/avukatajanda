#!/usr/bin/env python3
"""Minimal FastAPI app for testing"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Dict, Any
import os

# Create FastAPI app
app = FastAPI(title="AvukatAjanda API", version="2.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage for testing
users_db = {}
token_counter = 0

class UserRegister(BaseModel):
    email: str
    password: str
    name: str = None
    consents: Dict[str, bool]

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
async def root():
    return {
        "name": "AvukatAjanda API",
        "version": "2.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "database": "connected",
        "version": "2.0.0"
    }

@app.post("/auth/register")
async def register(user: UserRegister):
    global token_counter
    
    # Check consents
    if not all([user.consents.get("kvkk"), user.consents.get("aydinlatma"), user.consents.get("uyelik")]):
        raise HTTPException(status_code=400, detail="All consents required")
    
    # Check if exists
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Store user
    users_db[user.email] = {
        "password": user.password,
        "name": user.name,
        "id": len(users_db) + 1
    }
    
    token_counter += 1
    
    return {
        "id": users_db[user.email]["id"],
        "email": user.email,
        "name": user.name,
        "access_token": f"test_token_{token_counter}",
        "token_type": "bearer"
    }

@app.post("/auth/login")
async def login(user: UserLogin):
    global token_counter
    
    if user.email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if users_db[user.email]["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token_counter += 1
    
    return {
        "access_token": f"test_token_{token_counter}",
        "token_type": "bearer"
    }

@app.get("/api/stats")
async def stats():
    return {
        "total_clients": 0,
        "total_cases": 0,
        "active_cases": 0,
        "total_events": 0,
        "upcoming_events": 0
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Minimal API Server")
    print("📊 Health: http://localhost:8000/health")
    print("📚 Docs: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
