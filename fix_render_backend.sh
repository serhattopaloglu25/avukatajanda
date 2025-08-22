#!/bin/bash
echo "🔧 Fixing Render Backend - Python to Node.js"

# Python'u devre dışı bırak
[ -f "main.py" ] && mv main.py main.py.disabled
[ -f "requirements.txt" ] && mv requirements.txt requirements.txt.disabled

# Node.js package.json
cat > package.json << 'PKG'
{
  "name": "avukatajanda-backend",
  "version": "2.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
PKG

# Express server
cat > server.js << 'SRV'
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        runtime: 'Node.js Express',
        message: 'FIXED! Python → Node.js'
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AvukatAjanda Node.js API',
        runtime: 'Node.js Express'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Node.js API - Port:', PORT);
});
SRV

git add .
git commit -m "🔥 Fix Render: Python→Node.js"
git push origin main

echo "✅ FIXED! Render'da Settings→Runtime: Node yapın"
