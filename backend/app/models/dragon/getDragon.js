const pool = require("../../../databasePool");
const DragonTable = require("./table");
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('./index');

const getWholeDragon = ({ dragonId }) => {
    // console.log(dragonId)
    return Promise.all([
        DragonTable.getDragonWithoutTraits({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            // console.log([dragon, dragonTraits])
            return new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId
            })
        })
        .catch(error => console.error(error));
}

module.exports = getWholeDragon;