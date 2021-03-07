const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { findPlayer, addPlayer, getDetails } = require('../models/player.model');

const checkPlayer = (request, response) => {
    const playerData = request.body;
    
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
            return response.status(200).json({
                status: 'exists',
                message: 'Player Exists',
            });
        }
        
    });
};

const authenticatePlayer = (request, response) => {
    const playerData = request.body;
    
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
            if(compareSync(playerData.password, data.password))
            {
                delete data.password;
                
                const jsonToken = sign({ data: data }, process.env.JSON_WEBTOKEN_SECRET, {
                    expiresIn: "10h"
                });
                
                return response.status(200).json({
                    status: 'exists',
                    message: 'Player Exists',
                    token: jsonToken
                });
            }
            
            return response.status(200).json({
                status: 'invalid',
                message: 'Incorrect Password'
            });
        }
        
    });
};

const registerPlayer = (request, response) => {
    const playerData = request.body;
    
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(playerData.password, salt);
    
    playerData.hashedPassword = hashedPassword;
    
    // Check If Player Already Registered
    findPlayer(playerData, (status, data) => {
        
        if(status === 'error')
        {
            return response.status(500).json({
                status: 'error',
                message: 'Some Unexpected Error Happened',
                error: data
            });
        }
        
        if(status === 'exists')
        {
            return response.status(200).json({
                status: 'exists',
                message: 'Player Already Registered'
            });
        }
        
    });
    
    // Register Player
    addPlayer(playerData, (newPlayerStatus, newPlayerData) => {
        
        if(newPlayerStatus === 'error')
        {
            return response.status(500).json({
                status: 'error',
                message: 'Some Unexpected Error Happened',
                error: newPlayerData
            });
        }
        
        // Find Registered Player
        findPlayer(playerData, (status, data) => {
            
            delete data.password;
            
            const jsonToken = sign({ data: data }, process.env.JSON_WEBTOKEN_SECRET, {
                expiresIn: "1h"
            });
                
            return response.status(200).json({
                status: 'success',
                message: 'Player Registered Successfully',
                token: jsonToken
            });
            
        });
        
    });
    
};

const getPlayerDetails = (request, response) => {
    const playerData = request.tokenData.data;
    const tokenData = request.tokenData;
    
    getDetails(playerData, (status, data) => {
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
            delete data.password;
            
            return response.status(200).json({
                status: 'success',
                message: 'Player Details Found',
                data: data
            });
        }
        
        return response.status(200).json({
            status: 'failed',
            message: 'Player Details Not Found',
        });
    });
};

module.exports.checkPlayer = checkPlayer;
module.exports.authenticatePlayer = authenticatePlayer;
module.exports.registerPlayer = registerPlayer;
module.exports.getPlayerDetails = getPlayerDetails;