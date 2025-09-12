#!/usr/bin/env python3
"""Quick start script with SQLite"""

import os
import sys

# Set SQLite for local testing
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

print("🚀 Starting API with SQLite (Local Test)")
print("=" * 40)

try:
    # Create tables
    from app.db import engine, Base
    from app.models import User, Client, Case, Event, Organization, UserConsent
    
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database ready!")
    
    # Start server
    import uvicorn
    print("\n🎯 Starting server on http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    print("📊 Health: http://localhost:8000/health\n")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
    
except ImportError as e:
    print(f"\n❌ Missing dependency: {e}")
    print("\nRun: pip install -r requirements.txt")
    sys.exit(1)
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    sys.exit(1)
