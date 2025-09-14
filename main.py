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
