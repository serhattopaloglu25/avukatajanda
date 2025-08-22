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
