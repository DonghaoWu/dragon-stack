const express = require('express');
const bodyParser = require('body-parser');
const GenerationEngine = require('./models/generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error',
        message: err.message
    })
})

engine.start();

module.exports = app;