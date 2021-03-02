const pool = require('../utils/database');

const findPlayer = (playerData, callBackFunction) => {
    pool.query(
        `
        SELECT * FROM players WHERE email = ?
        `,
        [
            playerData.email
        ],
        (error, results, fields) => {
            if(error)
            {
                return callBackFunction('error', error);
            }
            
            if(results.length === 1)
            {
                return callBackFunction('exists', results[0]);
            }
            
            return callBackFunction('notexists', null);
        }
    );
};

const addPlayer = (playerData, callBackFunction) => {
    pool.query(
        `
        INSERT INTO players(name, email, password) VALUES(?, ?, ?)
        `,
        [
            playerData.name,
            playerData.email,
            playerData.hashedPassword
        ],
        (error, results, fields) => {
            if(error)
            {
                return callBackFunction('error', error);
            }
            
            return callBackFunction('success', null);
        }
    );
};

const getDetails = (playerData, callBackFunction) => {
    pool.query(
        `
        SELECT * FROM players WHERE playerID = ?
        `,
        [playerData.playerID],
        (error, results, fields) => {
            if(error)
            {
                return callBackFunction('error', error);
            }
            
            if(results.length === 1)
            {
                return callBackFunction('success', results[0]);
            }
            
            return callBackFunction('failed', null);
        }
    );
};

module.exports.findPlayer = findPlayer;
module.exports.addPlayer = addPlayer;
module.exports.getDetails = getDetails;