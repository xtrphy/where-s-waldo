require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('../prisma/client');
const app = express();

const gameRouter = require('./routes/game');

app.use(cors());

app.use(express.json());

app.use('/api', gameRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));