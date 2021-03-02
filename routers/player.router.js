const express = require('express');
const router = express.Router();

const { checkPlayer, authenticatePlayer, registerPlayer, getPlayerDetails } = require('../controllers/player.controller');
const { verifyToken } = require('../utils/helpers');

router.post('/check', checkPlayer);
router.post('/authenticate', authenticatePlayer);
router.post('/register', registerPlayer);

router.post('/getDetails', verifyToken, getPlayerDetails);

module.exports = router;