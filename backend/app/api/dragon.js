const { Router } = require('express');
const DragonTable = require('../dragon/table');
const getWholeDragon = require('../dragon/getDragon');

const router = new Router();

router.get('/new', (req, res, next) => {
    const dragon = req.app.locals.engine.generation.newDragon();

    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => next(error));
});


router.get('/:dragonId', (req, res, next) => {
    const dragonId = req.params.dragonId;
    console.log(dragonId)
    getWholeDragon({ dragonId })
        .then((dragon) => {
            res.json({ dragon })
        })
        .catch(error => next(error))
})

module.exports = router;