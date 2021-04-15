const db = require('../../../databaseConnection');

class TraitTable {
    static getTraitId({ traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2`,
                [traitType, traitValue],
                (error, response) => {
                    if (error) return reject(error);
                    
                    const traitId = response.rows[0].id;
                    resolve({ traitId });
                }
            )
        })
    };
}

module.exports = TraitTable;

