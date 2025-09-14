#!/usr/bin/env python3
"""
Main entry point for Avukat Ajanda Backend
"""

import os
import sys

# Try different entry points
if os.path.exists('minimal_app.py'):
    from minimal_app import app
    import uvicorn
    
    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 8000))
        uvicorn.run(app, host="0.0.0.0", port=port)
        
elif os.path.exists('run_server.py'):
    exec(open('run_server.py').read())
    
elif os.path.exists('app/__init__.py'):
    from app import create_app
    app = create_app()
    import uvicorn
    
    if __name__ == "__main__":
        port = int(os.environ.get("PORT", 8000))
        uvicorn.run(app, host="0.0.0.0", port=port)
else:
    print("Error: No valid entry point found!")
    sys.exit(1)

# Client endpoints
@app.get("/api/clients")
async def get_clients():
    return []

@app.post("/api/clients")
async def create_client(client: dict):
    return {"id": 1, **client}

# Case endpoints  
@app.get("/api/cases")
async def get_cases():
    return []

@app.post("/api/cases")
async def create_case(case: dict):
    return {"id": 1, **case}

# Dashboard
@app.get("/api/dashboard/stats")
async def dashboard_stats():
    return {
        "total_clients": 0,
        "total_cases": 0,
        "active_cases": 0,
        "upcoming_events": 0
    }
