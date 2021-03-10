const pool = require("../../../databasePool");
const DragonTable = require("./table");
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('./index');

const getWholeDragon = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragonWithoutTraits({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            return new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId,
                saleValue: dragon.saleValue,
                isPublic: dragon.isPublic,
                sireValue: dragon.sireValue
            })
        })
        .catch(error => console.error(error));
}

const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id FROM dragon WHERE "isPublic" = TRUE`,
            (error, response) => {
                if (error) reject(error);
                else {
                    const publicDragonRows = response.rows;

                    Promise.all(
                        publicDragonRows.map(({ id }) => {
                            return getWholeDragon({ dragonId: id })
                        })
                    )
                        .then((dragons) => {
                            resolve({ dragons })
                        })
                        .catch(error => reject(error));
                }
            }
        )
    })
}

module.exports = {
    getWholeDragon,
    getPublicDragons
};