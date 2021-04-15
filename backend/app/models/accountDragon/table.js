const db = require('../../../databaseConnection');

class AccountDragonTable {
    static storeAccountDragon({ accountId, dragonId }) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) reject(error);

                    resolve()
                }
            )
        })
    }
    static getAccountDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
                [accountId],
                (error, response) => {
                    if (error) reject(error);
                    resolve({ accountDragonIds: response.rows })
                }
            )
        })
    }
    static getDragonAccount({ dragonId }) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT "accountId" FROM accountDragon WHERE "dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountId: response.rows[0].accountId })
                }
            )
        })
    }

    static updateDragonAccount({ dragonId, accountId }) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE accountDragon SET "accountId" = $1 WHERE "dragonId" = $2`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve()
                }
            )
        })
    }
}
module.exports = AccountDragonTable;