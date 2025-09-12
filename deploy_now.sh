#!/bin/bash

echo "🚀 Deploying Python Backend to avukatajanda repo"
echo "================================================"

# Ensure we're in the right directory
cd /Users/bos/Desktop/AvukatAjanda_Ana_Klasor/avukat-ajanda-backend-py

# Set remote to avukatajanda repo
git remote set-url origin https://github.com/serhattopaloglu25/avukatajanda.git

# Add all changes
git add .

# Commit
git commit -m "Deploy Python/FastAPI backend

- FastAPI with SQLAlchemy
- JWT authentication
- Health endpoints
- CORS configured
- Render deployment ready"

# Force push to main branch
git push origin main --force

echo "✅ Pushed to GitHub"
echo ""
echo "📝 Next: Update Render Service"
echo "1. Go to Render Dashboard"
echo "2. Find 'avukatajanda' service"
echo "3. Manual Deploy"
echo "4. Check logs for any errors"
