const { Router } = require('express');
const DragonTable = require('../models/dragon/table');
const getWholeDragon = require('../models/dragon/getDragon');
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
            // console.log(currentAccountId);
            return AccountDragonTable.getAccountDragons({ accountId: currentAccountId })
        })
        .then(({ accountDragons }) => {
            // console.log(accountDragons, '==============>line 35')

            return Promise.all(
                accountDragons.map(accountDragon => {
                    return getWholeDragon({ dragonId: accountDragon.dragonId });
                })
            );
        })
        .then(dragons => {
            // console.log('==============>line 43', dragons)
            return res.json({ dragons });
        })
        .catch(error => next(error));
});

router.put('/update', (req, res, next) => {
    const { dragonId, nickname } = req.body;
    // console.log(dragonId, nickname, req.body);

    DragonTable.updateDragonNickname({ dragonId, nickname })
        .then(() => {
            res.json({ message: `successfully updated dragon's nickname` })
        })
        .catch(error => next(error));
})


router.get('/:dragonId', (req, res, next) => {
    const dragonId = req.params.dragonId;
    // console.log(dragonId)
    getWholeDragon({ dragonId })
        .then((dragon) => {
            res.json({ dragon })
        })
        .catch(error => next(error))
});

module.exports = router;