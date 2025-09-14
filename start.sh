#!/bin/bash

echo "🚀 Backend Başlatılıyor..."
echo "=========================="

cd /Users/bos/Desktop/AvukatAjanda_Ana_Klasor/avukat-ajanda-backend-py

# Python versiyonunu kontrol et
echo "Python versiyonu:"
python3 --version

# Virtual environment oluştur (Python 3.11 veya 3.12 kullan)
if [ ! -d "venv" ]; then
    echo "📦 Virtual environment oluşturuluyor..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install requirements
echo "📚 Bağımlılıklar yükleniyor..."
pip install -r requirements.txt

# Create database file if not exists
touch avukat.db

# Start backend
echo "✅ Backend başlatılıyor: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo ""
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000