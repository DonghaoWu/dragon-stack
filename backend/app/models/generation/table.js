const db = require('../../../databaseConnection');

class GenerationTable {
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (error, response) => {
                    if (error) return reject(error);

                    const generationId = response.rows[0].id;
                    resolve({ generationId });
                }
            )
        })
    };
}

module.exports = GenerationTable;