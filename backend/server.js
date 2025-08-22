const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AvukatAjanda API - Node.js Working!',
    version: '2.0.1',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'AvukatAjanda API',
    version: '2.0.1',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/init-db', (req, res) => {
  res.json({
    success: true,
    message: '🎉 Node.js API Working!',
    demo_credentials: {
      email: 'demo@avukatajanda.com',
      password: 'demo123'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AvukatAjanda API running on port ${PORT}`);
});
