const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));