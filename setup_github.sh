#!/bin/bash

echo "🚀 GitHub Repository Setup Script"
echo "=================================="

# Repository: avukat-ajanda-backend-py
echo "Creating new Python backend repository..."

cd /Users/bos/Desktop/AvukatAjanda_Ana_Klasor/avukat-ajanda-backend-py

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
fi

# Add all files
git add .
echo "✅ Files added"

# Commit
git commit -m "feat: Python/FastAPI backend implementation

- FastAPI with async support
- SQLAlchemy 2.0 ORM  
- JWT authentication
- PostgreSQL database support
- User consent tracking (KVKK)
- Alembic migrations
- Docker support
- Render deployment ready
- Health checks and monitoring
- CORS configuration"

echo "✅ Committed"

# Add remote (you'll need to create the repo on GitHub first)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/serhattopaloglu25/avukat-ajanda-backend-py.git
echo "✅ Remote added"

# Set branch to main
git branch -M main

echo ""
echo "Ready to push!"
echo ""
echo "Next steps:"
echo "1. Go to GitHub.com"
echo "2. Create new repository: 'avukat-ajanda-backend-py'"
echo "3. Make it Public"
echo "4. DON'T add README or .gitignore"
echo "5. Come back here and run: git push -u origin main"
echo ""
echo "Or if repo already exists, just run:"
echo "  git push -u origin main"
