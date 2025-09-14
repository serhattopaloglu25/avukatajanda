#!/bin/bash

echo "🔧 Backend Kurulum - Python 3.12"
echo "================================="

cd /Users/bos/Desktop/AvukatAjanda_Ana_Klasor/avukat-ajanda-backend-py

# Eski venv'i sil
echo "🗑️  Eski virtual environment siliniyor..."
rm -rf venv

# Python 3.12 ile yeni venv oluştur
echo "📦 Python 3.12 ile virtual environment oluşturuluyor..."
if command -v python3.12 &> /dev/null; then
    python3.12 -m venv venv
elif command -v /opt/homebrew/bin/python3.12 &> /dev/null; then
    /opt/homebrew/bin/python3.12 -m venv venv
elif command -v /usr/local/bin/python3.12 &> /dev/null; then
    /usr/local/bin/python3.12 -m venv venv
else
    echo "❌ Python 3.12 bulunamadı!"
    echo "Lütfen önce Python 3.12 kurun:"
    echo "brew install python@3.12"
    exit 1
fi

# Virtual environment'ı aktive et
source venv/bin/activate

# Python versiyonunu göster
echo "✅ Python versiyonu:"
python --version

# Pip'i güncelle
echo "📚 Pip güncelleniyor..."
pip install --upgrade pip setuptools wheel

# Requirements'ı yükle
echo "📦 Bağımlılıklar yükleniyor..."
pip install -r requirements.txt

# Database dosyasını oluştur
touch avukat.db

echo ""
echo "✅ Kurulum tamamlandı!"
echo ""
echo "Backend'i başlatmak için:"
echo "python -m uvicorn app.main:app --reload --port 8000"
echo ""
echo "veya"
echo "./start.sh"