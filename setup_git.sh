#!/bin/bash

# Git repository setup script
echo "🚀 Python Backend Git Setup"
echo "=========================="

# Initialize git
echo "📁 Initializing Git repository..."
git init

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "feat: Python/FastAPI backend implementation

- FastAPI with async support
- SQLAlchemy 2.0 ORM
- JWT authentication
- PostgreSQL database
- Alembic migrations
- Docker support
- Render deployment ready
- Health checks
- CORS configuration
- User consent tracking (KVKK)
"

# Add remote (will be added after GitHub repo creation)
echo "🔗 Ready to add remote origin..."
echo ""
echo "Next steps:"
echo "1. Create repo on GitHub: avukat-ajanda-backend-py"
echo "2. Run: git remote add origin https://github.com/serhattopaloglu25/avukat-ajanda-backend-py.git"
echo "3. Run: git branch -M main"
echo "4. Run: git push -u origin main"
