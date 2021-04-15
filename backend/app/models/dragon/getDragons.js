const db = require("../../../databaseConnection");
const DragonTable = require("./table");
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('./index');

const getWholeDragon = ({ dragonId, accountId }) => {
    return Promise.all([
        DragonTable.getDragonWithoutTraits({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            const curDragon = new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId,
                saleValue: dragon.saleValue,
                isPublic: dragon.isPublic,
                sireValue: dragon.sireValue
            })
            if (accountId) curDragon.accountId = accountId;
            return curDragon;
        })
        .catch(error => console.error(error));
}

const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT dragon.id, "accountId"
            FROM dragon
            INNER JOIN accountDragon
            ON dragon.id=accountDragon."dragonId"
            WHERE "isPublic" = TRUE`,
            (error, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    const publicDragonRows = response.rows;
                    Promise.all(
                        publicDragonRows.map(({ id, accountId }) => {
                            return getWholeDragon({ dragonId: id, accountId })
                        })
                    )
                        .then((dragons) => {
                            resolve({ dragons })
                        })
                        .catch(error => {
                            reject(error)
                        });
                }
            }
        )
    })
}

module.exports = {
    getWholeDragon,
    getPublicDragons
};