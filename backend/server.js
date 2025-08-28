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
