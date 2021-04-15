const TRAITS = require("../data/traits.json");
const db = require("../databaseConnection");

db.connect();

let curNum = 0;

TRAITS.map(TRAIT => {
    const traitType = TRAIT.type;
    const traitValues = TRAIT.values;

    traitValues.map(traitValue => {
        db.query(
            `INSERT INTO trait("traitType", "traitValue") VALUES($1, $2) RETURNING id`,
            [traitType, traitValue],
            (error, res) => {
                if (error) console.error(error);
                curNum++;
                const traitId = res.rows[0].id;
                console.log(`Inserted trait - id: ${traitId}`);
                if(curNum === 16){
                    db.end();
                }
            }
        )
    })
});