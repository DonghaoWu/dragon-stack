1. SQL design

```sql

```

```sql

```

```sql

```


```sql

```

```sql

```

```sql

```

2. configure_db.sh

```sh

```

3. database pool configuration.

```js

```

4. oop programming

- generation

```js
const { REFRESH_RATE, SECONDS } = require('../../config');
const Dragon = require('../dragon/index');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.accountIds = new Set();
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));


        const msUntilExpiration = Math.random() < 0.5
            ? refreshRate - expirationPeriod
            : refreshRate + expirationPeriod

        return new Date(Date.now() + msUntilExpiration)
    }

    newDragon({ accountId }) {
        if (Date.now() > this.expiration) {
            throw new Error('This generation expried on ' + this.expiration);
        }
        if (this.accountIds.has(accountId)) {
            throw new Error('You already have a dragon from this generation.');
        }
        this.accountIds.add(accountId);
        return new Dragon({ generationId: this.generationId });
    }
}

module.exports = Generation;
```

- dragon
```js
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
```