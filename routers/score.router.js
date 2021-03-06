const express = require('express');
const router = express.Router();

const { getPlayerStats, savePlayerGameScore } = require('../controllers/score.controller');
const { verifyToken } = require('../utils/helpers');

router.post('/getPlayerStats', verifyToken, getPlayerStats);
router.post('/savePlayerGameScore', verifyToken, savePlayerGameScore);

module.exports = router;