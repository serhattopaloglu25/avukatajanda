#!/bin/bash

echo "🚀 Starting AvukatAjanda Python Backend"
echo "======================================="

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies if needed
echo "📦 Checking dependencies..."
pip install -q -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

echo "🗄️  Creating/updating database tables..."
python3 -c "
from app.db import engine, Base
from app.models import *
Base.metadata.create_all(bind=engine)
print('✅ Database tables created/updated')
"

echo ""
echo "🎯 Starting server on http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo "📊 Health Check: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo "======================================="
echo ""

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
