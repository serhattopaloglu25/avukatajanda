#!/bin/bash

# Render Service Check
echo "🔍 Checking Render Python Service"
echo "================================="

API_URL="https://avukatajanda.onrender.com"

echo "Testing: $API_URL"
echo ""

# Check if service is responding
echo "1. Health Check:"
curl -s "$API_URL/health" | python3 -m json.tool || echo "Service not responding"

echo ""
echo "2. Root Endpoint:"
curl -s "$API_URL/" | python3 -m json.tool || echo "Service not responding"

echo ""
echo "3. Response Headers:"
curl -sI "$API_URL/health" | head -n 5

echo ""
echo "================================="
echo "If the service is not responding, you need to:"
echo "1. Go to Render Dashboard"
echo "2. Check if 'avukatajanda' service is using the Python backend"
echo "3. Or create a new service from the GitHub repo"
