const pool = require('../utils/database');

const findPlayerStats = (playerData, callBackFunction) => {
    pool.query(
        `
        SELECT COUNT(scoreID) AS totalGamePlayed, IFNULL(AVG(score), 0) AS averageGameTime, IFNULL(MAX(score), 0) AS bestScore
        FROM scores
        WHERE playerID = ?
        `,
        [
            playerData.playerID
        ],
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

const addPlayerScore = (playerData, callBackFunction) => {
    pool.query(
        `
        INSERT INTO scores(playerID, score) VALUES(?, ?)
        `,
        [
            playerData.playerID,
            playerData.score
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

const findPlayerScores = (playerData, callBackFunction) => {
    pool.query(
        `
        SELECT * FROM scores 
        WHERE playerID = ? 
        ORDER BY scoreID DESC
        LIMIT 15 OFFSET ? ;
        `,
        [
            playerData.playerID,
            playerData.page
        ],
        (error, results, fields) => {
            if(error)
            {
                return callBackFunction('error', error);
            }
            
            return callBackFunction('success', results);
        }
    );
};

module.exports.findPlayerStats = findPlayerStats;
module.exports.addPlayerScore = addPlayerScore;
module.exports.findPlayerScores = findPlayerScores;