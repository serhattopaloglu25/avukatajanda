#!/bin/bash

echo "📊 Creating new clean Render service"
echo "===================================="

# Commit simplified requirements
git add requirements-simple.txt
git commit -m "Add simplified requirements for Render"
git push origin main

echo ""
echo "✅ Pushed simplified config"
echo ""
echo "🆕 Create NEW Render Service:"
echo "-----------------------------"
echo "1. Go to: https://dashboard.render.com/new/web"
echo "2. Connect: github.com/serhattopaloglu25/avukatajanda"
echo "3. Service Configuration:"
echo "   Name: avukat-python-backend"
echo "   Region: Frankfurt (EU)"
echo "   Branch: main"
echo "   Runtime: Python 3"
echo ""
echo "4. Build Settings:"
echo "   Build Command: pip install -r requirements-simple.txt"
echo "   Start Command: uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
echo ""
echo "5. Environment Variables (copy from Node.js service):"
echo "   DATABASE_URL = [PostgreSQL connection string]"
echo "   JWT_SECRET = [secure key]"
echo "   CORS_ORIGINS = https://avukatajanda.com,http://localhost:3000"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "New URL will be: https://avukat-python-backend.onrender.com"
