const express = require('express');
const router = express.Router();

const { getPlayerStats } = require('../controllers/score.controller');
const { verifyToken } = require('../utils/helpers');

router.post('/getPlayerStats', verifyToken, getPlayerStats);

module.exports = router;