const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'AvukatAjanda API - Node.js Working!' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', runtime: 'Node.js' });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
