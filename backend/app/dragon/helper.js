const pool = require("../../databasePool");
const DragonTable = require("./table");
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
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
                dragonId: dragonId
            })
        })
        .catch(error => console.error(error));
}

module.exports = getDragonWithTraits;