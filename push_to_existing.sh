#!/bin/bash

echo "🚀 Pushing to existing avukatajanda repository"
echo "=============================================="

# Push to existing avukatajanda repo (which has Python code)
git remote remove origin
git remote add origin https://github.com/serhattopaloglu25/avukatajanda.git
git push -u origin main --force

echo "✅ Pushed to avukatajanda repository"
echo ""
echo "Now updating Render..."
