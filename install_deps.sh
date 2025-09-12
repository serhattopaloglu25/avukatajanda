#!/bin/bash

echo "📦 Installing dependencies one by one..."
echo "======================================="

# Upgrade pip first
pip install --upgrade pip

# Core dependencies
echo "Installing FastAPI..."
pip install fastapi==0.104.1

echo "Installing Uvicorn..."
pip install "uvicorn[standard]==0.24.0"

echo "Installing SQLAlchemy..."
pip install sqlalchemy==2.0.23

echo "Installing PostgreSQL driver..."
pip install psycopg2-binary==2.9.9 || echo "PostgreSQL driver optional for SQLite"

echo "Installing Pydantic..."
pip install pydantic==2.5.2
pip install pydantic-settings==2.1.0

echo "Installing Auth dependencies..."
pip install "passlib[bcrypt]==1.7.4"
pip install "python-jose[cryptography]==3.3.0"

echo "Installing Alembic..."
pip install alembic==1.13.0

echo "Installing other dependencies..."
pip install python-multipart==0.0.6
pip install python-dotenv==1.0.0

echo ""
echo "✅ All dependencies installed!"
echo "======================================="
