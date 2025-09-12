#!/bin/bash

# Render Runtime Script
echo "Detecting runtime environment..."

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Python detected, starting FastAPI app..."
    pip install -r requirements.txt
    uvicorn app.main:app --host 0.0.0.0 --port $PORT
else
    echo "Python not available, falling back to Node.js..."
    npm install
    npm start
fi