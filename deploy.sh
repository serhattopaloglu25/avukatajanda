#!/bin/bash

# Push Python code to avukatajanda repo
echo "📦 Pushing Python backend to GitHub..."

git remote set-url origin https://github.com/serhattopaloglu25/avukatajanda.git
git push -u origin main --force

echo "✅ Pushed successfully"
echo ""
echo "⚠️ IMPORTANT: Now update Render settings:"
echo "1. Go to Render Dashboard → avukatajanda service"
echo "2. Settings → Build Command: pip install -r requirements.txt"
echo "3. Settings → Start Command: uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
echo "4. Manual Deploy to apply changes"
