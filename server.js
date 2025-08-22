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
        message: 'Backend successfully migrated to Node.js!'
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AvukatAjanda Node.js API',
        runtime: 'Node.js Express'
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'demo@avukatajanda.com' && password === 'demo123') {
        res.json({
            success: true,
            token: 'demo-token',
            user: { name: 'Demo Avukat', email }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/api/dashboard/stats', (req, res) => {
    res.json({
        success: true,
        data: {
            active_cases: 24,
            total_clients: 67,
            pending_tasks: 18,
            monthly_revenue: 182000
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Node.js API running on port ${PORT}`);
});
