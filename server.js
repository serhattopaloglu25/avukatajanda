const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        runtime: 'Node.js Express',
        message: 'AvukatAjanda API Active'
    });
});

// Auth
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'demo@avukatajanda.com' && password === 'demo123') {
        res.json({
            success: true,
            token: 'demo-token',
            user: {
                name: 'Demo Avukat',
                email: email,
                role: 'admin'
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Dashboard stats
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

// Recent cases
app.get('/api/cases/recent', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                title: 'Boşanma Davası - Yılmaz',
                client: 'Ayşe Yılmaz',
                status: 'active',
                next_date: '28 Ağu',
                next_action: 'Duruşma'
            },
            {
                id: 2,
                title: 'İş Hukuku - TechCorp',
                client: 'TechCorp Ltd.',
                status: 'pending',
                next_date: '30 Ağu',
                next_action: 'Evrak'
            }
        ]
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API running on port ${PORT}`);
});
