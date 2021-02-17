const TRAITS = require('../data/traits.json');

const DEFAULT_PORPERTIES = {
    nickname: 'unnamed',
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
    constructor({ birthdate, nickname, traits } = {}) {
        this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
        this.traits = traits || DEFAULT_PORPERTIES.randomTraits;
    }
}

module.exports = Dragon;