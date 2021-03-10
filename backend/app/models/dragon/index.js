const TRAITS = require('../../../data/traits.json');

const DEFAULT_PORPERTIES = {
    dragonId: undefined,
    nickname: 'unnamed',
    generationId: undefined,
    isPublic: false,
    saleValue: 0,
    sireValue: 0,
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            traits.push({ traitType, traitValue })
        });
        return traits;
    }
}

class Dragon {
    constructor({ dragonId, birthdate, nickname, traits, generationId, saleValue, isPublic, sireValue } = {}) {
        this.dragonId = dragonId || DEFAULT_PORPERTIES.dragonId;
        this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
        this.traits = traits || DEFAULT_PORPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PORPERTIES.generationId;
        this.isPublic = isPublic || DEFAULT_PORPERTIES.isPublic;
        this.saleValue = saleValue || DEFAULT_PORPERTIES.saleValue;
        this.sireValue = sireValue || DEFAULT_PORPERTIES.sireValue;
    }
}

module.exports = Dragon;