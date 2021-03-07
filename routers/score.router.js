const express = require('express');
const router = express.Router();

const { getPlayerStats, savePlayerGameScore, getPlayerScores } = require('../controllers/score.controller');
const { verifyToken } = require('../utils/helpers');

router.post('/getPlayerStats', verifyToken, getPlayerStats);
router.post('/savePlayerGameScore', verifyToken, savePlayerGameScore);
router.post('/getPlayerScores', verifyToken, getPlayerScores);

module.exports = router;