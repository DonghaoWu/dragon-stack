// const Dragon = require('./dragon.js');

// const fooey = new Dragon({
//     birthdate: new Date(),
//     nickname: 'first'
// });

// setTimeout(() => {
//     console.log('3 seconds later...');
//     const helo = new Dragon();
//     console.log(helo);
// }, 3000)


// console.log(fooey);

// const Generation = require('./generation');

// const generation = new Generation();

// console.log('=========>generation', generation)

// const goby = generation.newDragon();

// console.log('=========>goby',goby);

// setTimeout(() => {
//     console.log('3 seconds later...');
//     const helo = generation.newDragon();
//     console.log(helo);
// }, 10000)

const GenerationEngine = require('./engine');

const engine = new GenerationEngine();

engine.start();

setTimeout(() => {
    engine.stop();
}, 20000)