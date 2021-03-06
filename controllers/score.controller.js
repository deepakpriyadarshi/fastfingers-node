const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { findPlayer } = require('../models/player.model');
const { findPlayerStats, addPlayerScore, findPlayerScores } = require('../models/score.model');

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

const savePlayerGameScore = (request, response) => {
    let playerData = request.tokenData.data;
    
    playerData.score = request.body.score;
    
    findPlayer(playerData, (status, data) => {
        
        if(status === 'error')
        {
            return response.status(500).json({
                status: 'error',
                message: 'Some Unexpected Error Happened',
                error: data
            });
        }
        
        if(status === 'notexists')
        {
            return response.status(200).json({
                status: 'notexists',
                message: 'Player Does Not Exists'
            });
        }
        
        if(status === 'exists')
        {
            // Save Score
            addPlayerScore(playerData, (status, data) => {
                
                if(status === 'error')
                {
                    return response.status(500).json({
                        status: 'error',
                        message: 'Some Unexpected Error Happened',
                        error: data
                    });
                }
                
                if(status === 'success')
                {
                    return response.status(200).json({
                        status: 'success',
                        message: 'Player Score Saved Successfully',
                    });
                }
            });
        }
        
    });
};

const getPlayerScores = (request, response) => {
    let playerData = request.tokenData.data;
    
    playerData.page = request.body.page * 15;
    
    findPlayer(playerData, (status, data) => {
        
        if(status === 'error')
        {
            return response.status(500).json({
                status: 'error',
                message: 'Some Unexpected Error Happened',
                error: data
            });
        }
        
        if(status === 'notexists')
        {
            return response.status(200).json({
                status: 'notexists',
                message: 'Player Does Not Exists'
            });
        }
        
        if(status === 'exists')
        {
            // Find Scores
            findPlayerScores(playerData, (scoreStatus, scoreData) => {
                
                if(scoreStatus === 'error')
                {
                    return response.status(500).json({
                        status: 'error',
                        message: 'Some Unexpected Error Happened',
                        error: scoreData
                    });
                }
                
                if(scoreStatus === 'success')
                {
                    return response.status(200).json({
                        status: 'success',
                        message: 'Player Scores Found Successfully',
                        data: scoreData
                    });
                }
            });
        }
        
    });
};

module.exports.getPlayerStats = getPlayerStats;
module.exports.savePlayerGameScore = savePlayerGameScore;
module.exports.getPlayerScores = getPlayerScores;