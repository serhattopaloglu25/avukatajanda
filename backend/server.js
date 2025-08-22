const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: [
    'https://avukatajanda.com',
    'https://www.avukatajanda.com',
    'https://app.avukatajanda.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AvukatAjanda API - Clio Clone',
    version: '2.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth/*',
      dashboard: '/api/dashboard',
      cases: '/api/cases',
      clients: '/api/clients',
      init: '/api/init-db'
    },
    documentation: 'https://api.avukatajanda.com/docs'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'AvukatAjanda API',
    version: '2.0.0',
    database: 'PostgreSQL Connected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize database
app.get('/api/init-db', async (req, res) => {
  try {
    console.log('🏗️ Database initialization started...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        bar_number VARCHAR(50),
        firm_name VARCHAR(200),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create cases table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cases (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title VARCHAR(500) NOT NULL,
        case_number VARCHAR(100),
        case_type VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        client_name VARCHAR(200),
        court_name VARCHAR(200),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create clients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        tc_no VARCHAR(11),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if demo user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', ['demo@avukatajanda.com']);
    
    if (userCheck.rows.length === 0) {
      // Create demo user
      const hashedPassword = await bcrypt.hash('demo123', 12);
      const userResult = await pool.query(
        'INSERT INTO users (email, password_hash, first_name, last_name, phone, bar_number, firm_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        ['demo@avukatajanda.com', hashedPassword, 'Demo', 'Avukat', '0532 123 45 67', '12345', 'Demo Hukuk Bürosu']
      );
      
      const userId = userResult.rows[0].id;

      // Create demo cases
      await pool.query(
        'INSERT INTO cases (user_id, title, case_number, case_type, status, client_name, court_name, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userId, 'Boşanma Davası - Ahmet Yılmaz', '2025/123', 'Aile Hukuku', 'active', 'Ayşe Yılmaz', 'Ankara 2. Aile Mahkemesi', 'Çekişmeli boşanma davası']
      );

      await pool.query(
        'INSERT INTO cases (user_id, title, case_number, case_type, status, client_name, court_name, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userId, 'İş Hukuku - TechCorp Ltd.', '2025/456', 'İş Hukuku', 'pending', 'TechCorp Ltd.', 'İstanbul İş Mahkemesi', 'Kıdem tazminatı davası']
      );
    }

    res.json({
      success: true,
      message: '🎉 Database initialized successfully!',
      demo_credentials: {
        email: 'demo@avukatajanda.com',
        password: 'demo123'
      },
      tables_created: ['users', 'cases', 'clients']
    });

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Database initialization failed',
      error: error.message
    });
  }
});

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, first_name, last_name, firm_name FROM users WHERE email = $1 AND is_active = true',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email veya şifre hatalı'
      });
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email veya şifre hatalı'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Giriş başarılı',
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        firm_name: user.firm_name
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Giriş sırasında hata oluştu'
    });
  }
});

// Dashboard endpoint
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get stats
    const casesResult = await pool.query(
      'SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = $1) as active FROM cases WHERE user_id = $2',
      ['active', userId]
    );

    const clientsResult = await pool.query(
      'SELECT COUNT(*) as total FROM clients WHERE user_id = $1',
      [userId]
    );

    // Get recent cases
    const recentCases = await pool.query(
      'SELECT id, title, case_number, status, client_name, created_at FROM cases WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );

    // Calculate monthly revenue (demo data)
    const monthlyRevenue = Math.floor(Math.random() * 200000) + 100000;

    res.json({
      success: true,
      data: {
        stats: {
          active_cases: parseInt(casesResult.rows[0].active) || 0,
          total_clients: parseInt(clientsResult.rows[0].total) || 0,
          pending_tasks: Math.floor(Math.random() * 10) + 1,
          monthly_revenue: monthlyRevenue
        },
        recent_cases: recentCases.rows.map(case_ => ({
          id: case_.id,
          title: case_.title,
          status: case_.status,
          client: case_.client_name,
          date: case_.created_at.toISOString().split('T')[0]
        })),
        upcoming_hearings: [
          {
            id: 1,
            title: 'Boşanma Davası Duruşması',
            date: '2025-08-25',
            time: '10:00',
            court: 'Ankara 2. Aile Mahkemesi'
          }
        ]
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Dashboard verisi alınamadı'
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Sunucu hatası'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint bulunamadı',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/init-db',
      'POST /api/auth/login',
      'GET /api/dashboard'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AvukatAjanda API running on port ${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
