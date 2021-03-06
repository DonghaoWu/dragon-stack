const pool = require('../../../databasePool');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account("usernameHash", "passwordHash") 
                        VALUES($1, $2) RETURNING id`,
                [usernameHash, passwordHash],
                (error, response) => {
                    if (error) return reject(error);

                    const accountId = response.rows[0].id;

                    resolve({ accountId });
                }
            )
        })
    };

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id, "passwordHash", "sessionId" FROM account
            WHERE "usernameHash" = $1`,
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    const account = response.rows[0];

                    resolve({ account });
                }
            )
        })
    }

    static updateSessionId({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account SET "sessionId"=$1 WHERE "usernameHash" = $2`,
                [sessionId, usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        })
    }
}

module.exports = AccountTable;