#!/bin/bash

# API Test Script
API_URL="${1:-http://localhost:8000}"
echo "🧪 Testing API: $API_URL"
echo "================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "\n📊 Test 1: Health Check"
echo "------------------------"
HEALTH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$API_URL/health")
HTTP_STATUS=$(echo "$HEALTH_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}❌ Health check failed (HTTP $HTTP_STATUS)${NC}"
    echo "Response: $BODY"
fi

# Test 2: Register New User
echo -e "\n👤 Test 2: User Registration"
echo "-----------------------------"
TIMESTAMP=$(date +%s)
REGISTER_DATA='{
  "email":"test'$TIMESTAMP'@example.com",
  "password":"Test1234!",
  "name":"Test User",
  "consents":{
    "kvkk":true,
    "aydinlatma":true,
    "uyelik":true
  }
}'

REGISTER_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REGISTER_DATA")

HTTP_STATUS=$(echo "$REGISTER_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$REGISTER_RESPONSE" | sed '$d')

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Registration successful${NC}"
    # Extract token
    TOKEN=$(echo "$BODY" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    if [ ! -z "$TOKEN" ]; then
        echo "Token received: ${TOKEN:0:20}..."
    fi
else
    echo -e "${RED}❌ Registration failed (HTTP $HTTP_STATUS)${NC}"
    echo "Response: $BODY"
fi

# Test 3: Login
echo -e "\n🔐 Test 3: User Login"
echo "----------------------"
LOGIN_DATA='{
  "email":"test'$TIMESTAMP'@example.com",
  "password":"Test1234!"
}'

LOGIN_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "$LOGIN_DATA")

HTTP_STATUS=$(echo "$LOGIN_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$LOGIN_RESPONSE" | sed '$d')

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
    TOKEN=$(echo "$BODY" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    
    # Test 4: Get Stats with Auth
    echo -e "\n📈 Test 4: Get Stats (Authenticated)"
    echo "-------------------------------------"
    STATS_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "$API_URL/api/stats" \
      -H "Authorization: Bearer $TOKEN")
    
    HTTP_STATUS=$(echo "$STATS_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
    BODY=$(echo "$STATS_RESPONSE" | sed '$d')
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ Stats endpoint working${NC}"
        echo "Response: $BODY"
    else
        echo -e "${RED}❌ Stats endpoint failed (HTTP $HTTP_STATUS)${NC}"
    fi
else
    echo -e "${RED}❌ Login failed (HTTP $HTTP_STATUS)${NC}"
    echo "Response: $BODY"
fi

# Test 5: CORS Headers
echo -e "\n🌐 Test 5: CORS Headers Check"
echo "-------------------------------"
CORS_RESPONSE=$(curl -s -I -X OPTIONS "$API_URL/health" \
  -H "Origin: https://avukatajanda.com" \
  -H "Access-Control-Request-Method: GET")

if echo "$CORS_RESPONSE" | grep -q "access-control-allow-origin"; then
    echo -e "${GREEN}✅ CORS headers present${NC}"
    echo "$CORS_RESPONSE" | grep -i "access-control"
else
    echo -e "${RED}❌ CORS headers missing${NC}"
fi

echo -e "\n================================"
echo "🏁 Test Summary Complete"
echo "================================"
