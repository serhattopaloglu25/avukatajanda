#!/bin/bash

echo "🔍 Checking Render deployment status..."
echo "======================================"

# Test current status
echo "1. Testing avukatajanda.onrender.com:"
response=$(curl -s -w "\nHTTP_CODE:%{http_code}" https://avukatajanda.onrender.com/health 2>/dev/null)
http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d: -f2)
body=$(echo "$response" | grep -v "HTTP_CODE")

if [ "$http_code" = "200" ]; then
    echo "✅ Service is running"
    echo "Response: $body"
else
    echo "❌ Service not responding (HTTP: $http_code)"
fi

echo ""
echo "2. Alternative: Deploy to a new service"
echo "----------------------------------------"
echo "Since the existing service might have issues, consider:"
echo ""
echo "Option A: Create NEW service on Render"
echo "  1. Go to Render Dashboard"
echo "  2. New → Web Service"
echo "  3. Connect: github.com/serhattopaloglu25/avukatajanda"
echo "  4. Name: avukat-api-python"
echo "  5. Runtime: Python 3"
echo "  6. Build: pip install -r requirements.txt"
echo "  7. Start: uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
echo ""
echo "Option B: Use existing Node.js backend"
echo "  URL: https://avukat-ajanda-backend.onrender.com"
echo ""

# Test Node.js backend
echo "3. Testing Node.js backend:"
curl -s https://avukat-ajanda-backend.onrender.com/api/health | head -1
