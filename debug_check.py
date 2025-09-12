#!/usr/bin/env python3
"""Quick debug script to check if everything is working"""

import sys
import os

print("🔍 Python Backend Debug Check")
print("=" * 40)

# Check Python version
print(f"✓ Python version: {sys.version}")

# Check if dependencies are installed
try:
    import fastapi
    print(f"✓ FastAPI version: {fastapi.__version__}")
except ImportError:
    print("✗ FastAPI not installed")

try:
    import sqlalchemy
    print(f"✓ SQLAlchemy version: {sqlalchemy.__version__}")
except ImportError:
    print("✗ SQLAlchemy not installed")

try:
    import uvicorn
    print(f"✓ Uvicorn installed")
except ImportError:
    print("✗ Uvicorn not installed")

# Check if .env exists
if os.path.exists(".env"):
    print("✓ .env file exists")
    from dotenv import load_dotenv
    load_dotenv()
    print(f"  DATABASE_URL: {os.getenv('DATABASE_URL', 'Not set')[:30]}...")
else:
    print("✗ .env file not found")

# Try to import the app
try:
    from app.main import app
    print("✓ App imported successfully")
    
    # Try to create tables
    from app.db import engine, Base
    from app.models import User, Client, Case, Event
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created")
    
except Exception as e:
    print(f"✗ Error importing app: {e}")

print("=" * 40)
print("\nIf all checks pass, run:")
print("  uvicorn app.main:app --reload --port 8000")
