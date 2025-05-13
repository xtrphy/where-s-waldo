const express = require('express');
const prisma = require('../../prisma/client');
const router = express.Router();

router.get('/game-data', async (req, res) => {
    const image = await prisma.image.findFirst({
        include: { characters: true },
    });
    res.json(image);
});

router.post('/check-character', async (req, res) => {
    const { characterId, x, y } = req.body;

    const character = await prisma.character.findUnique({ where: { id: characterId } });

    const isCorrect =
        x >= character.xStart &&
        x <= character.xEnd &&
        y >= character.yStart &&
        y <= character.yEnd;

    res.json({ isCorrect });
});

router.get('/leaderboard', async (req, res) => {
    const results = await prisma.leaderboard.findMany({
        orderBy: { time: 'asc' },
        take: 10,
    });
    res.json(results);
});

router.post('/leaderboard', async (req, res) => {
    const { playerName, time } = req.body;
    const result = await prisma.leaderboard.create({ data: { playerName, time } });
    res.json(result);
});

module.exports = router;