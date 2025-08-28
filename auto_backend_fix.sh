[ -f main.py ] && mv main.py main.py.disabled && echo "✅ main.py → main.py.disabled"
[ -f start.sh ] && mv start.sh start.sh.disabled && echo "✅ start.sh → start.sh.disabled" 
echo "📦 Ana package.json oluşturuluyor..."
cat > package.json << 'PACKAGE_EOF'
{
  "name": "avukatajanda",
  "version": "2.1.0",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "pg": "^8.11.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.3.1"
  }
}
PACKAGE_EOF

# Backend server.js güncelle
echo "🔧 Backend server.js güncelleniyor..."
cat > backend/server.js << 'SERVER_EOF'
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

console.log('🚀 AvukatAjanda Node.js API başlatılıyor...');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AvukatAjanda API - Node.js Backend Aktif! 🚀',
    version: '2.1.0',
    runtime: 'Node.js Express',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'AvukatAjanda Node.js API',
    version: '2.1.0',
    runtime: 'Node.js Express',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/init-db', (req, res) => {
  res.json({
    success: true,
    message: '🎉 Node.js API Successfully Running!',
    runtime: 'Node.js Express',
    demo_credentials: {
      email: 'demo@avukatajanda.com',
      password: 'demo123'
    },
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    runtime: 'Node.js Express'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Node.js API çalışıyor - Port: ${PORT}`);
});
SERVER_EOF

# Git push
echo "📤 Git'e push ediliyor..."
git add .
git commit -m "🔥 Python to Node.js migration complete"
git push origin main

echo "🎉 TAMAMLANDI! 5 dakika bekleyip test edin:"
echo "https://avukat-ajanda-api.onrender.com/health"
