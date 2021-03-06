const pool = require('../utils/database');

const findPlayerStats = (playerData, callBackFunction) => {
    pool.query(
        `
        SELECT COUNT(scoreID) AS totalGamePlayed, AVG(score) AS averageGameTime, MAX(score) AS bestScore
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

module.exports.findPlayerStats = findPlayerStats;