const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { findPlayerStats } = require('../models/score.model');

const getPlayerStats = (request, response) => {
    const playerData = request.tokenData.data;
    
    findPlayerStats(playerData, (status, data) => {
        
        if(status === 'error')
        {
            return response.status(500).json({
                status: 'error',
                message: 'Some Unexpected Error Happened',
                error: data
            });
        }
        
        if(status === 'failed')
        {
            return response.status(200).json({
                status: 'failed',
                message: 'Failed To Get Player Score Stats'
            });
        }
        
        if(status === 'success')
        {
            return response.status(200).json({
                status: 'success',
                message: 'Player Score Stats Found',
                data: data
            });
        }
        
    });
};

module.exports.getPlayerStats = getPlayerStats;