console.log('🚀 Starting AvukatAjanda Node.js API...');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.json({
    success: true,
    message: 'AvukatAjanda API - Node.js Backend Active!',
    version: '2.1.0',
    runtime: 'Node.js',
    timestamp: new Date().toISOString(),
    endpoints: ['/', '/health', '/api/init-db']
  });
});

app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ 
    status: 'OK',
    service: 'AvukatAjanda Node.js API',
    version: '2.1.0',
    runtime: 'Node.js Express',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/init-db', (req, res) => {
  console.log('Database init endpoint hit');
  res.json({
    success: true,
    message: '🎉 Node.js API Successfully Running!',
    runtime: 'Node.js',
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
    runtime: 'Node.js',
    available: ['/', '/health', '/api/init-db']
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AvukatAjanda Node.js API running on port ${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
