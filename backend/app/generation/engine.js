const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor() {
        this.generation = null;
        this.timer = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this.timer)
    }

    buildNewGeneration() {
        const generation = new Generation();

        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                this.generation = generation;
                this.generation.generationId = generationId;

                console.log(this.generation);

                this.timer = setTimeout(() => {
                    this.buildNewGeneration()
                }, this.generation.expiration.getTime() - Date.now());
            })
            .catch(error => console.error(error));
    }
}

module.exports = GenerationEngine;

// ================================== async/ await ============================ //

// const Generation = require('./index');
// const GenerationTable = require('./table');

// class GenerationEngine {
//     constructor() {
//         this.generation = null;
//         this.timer = null;
//     }

//     start() {
//         this.buildNewGeneration();
//     }

//     stop() {
//         clearTimeout(this.timer)
//     }

//     async buildNewGeneration() {
//         try {
//             this.generation = new Generation();

//             const data = await GenerationTable.storeGeneration(this.generation)
//             this.generation.generationId = data.generationId;

//             console.log(this.generation);

//             this.timer = setTimeout(() => {
//                 this.buildNewGeneration()
//             }, this.generation.expiration.getTime() - Date.now());

//         } catch (error) {
//             error => console.error(error)
//         }
//     }
// }

// module.exports = GenerationEngine;