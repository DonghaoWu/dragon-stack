const { Router } = require('express');
const DragonTable = require('../models/dragon/table');
const { getWholeDragon, getPublicDragons } = require('../models/dragon/getDragons');
const { authenticatedAccount } = require('./sessionFunc');
const AccountDragonTable = require('../models/accountDragon/table');

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
        .then(({ currentAccountId }) => {
            accountId = currentAccountId;
            dragon = req.app.locals.engine.generation.newDragon();
            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => {
            return res.json({ dragon })
        })
        .catch(error => next(error));;
});

router.get('/dragons', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ currentAccountId }) => {
            return AccountDragonTable.getAccountDragons({ accountId: currentAccountId })
        })
        .then(({ accountDragons }) => {
            return Promise.all(
                accountDragons.map(accountDragon => {
                    return getWholeDragon({ dragonId: accountDragon.dragonId });
                })
            );
        })
        .then(dragons => {
            return res.json({ dragons });
        })
        .catch(error => next(error));
});

router.put('/update', (req, res, next) => {
    const { dragonId, nickname, isPublic, saleValue } = req.body;

    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
        .then(() => {
            res.json({ message: `successfully updated dragon.` })
        })
        .catch(error => next(error));
});

router.get('/public-dragons', (req, res, next) => {
    getPublicDragons()
        .then(({ dragons }) => {
            return res.json({ dragons })
        })
        .catch(error => next(error));
});

router.get('/:dragonId', (req, res, next) => {
    const dragonId = req.params.dragonId;
    getWholeDragon({ dragonId })
        .then((dragon) => {
            res.json({ dragon })
        })
        .catch(error => next(error))
});

module.exports = router;