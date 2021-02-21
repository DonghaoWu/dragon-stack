const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js');
const setSession = require('./helper');
const Session = require('../account/session');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (!account) {
                return AccountTable.storeAccount({ usernameHash, passwordHash })
            }
            else {
                const error = new Error('This username has already been taken.');
                error.statrsCode = 409;
                throw (error);
            }
        })
        .then(() => {
            return setSession({ username, res })
        })
        .then((message) => {
            res.json(message)
        })
        .catch(error => next(error))
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
            if (!account || account.passwordHash !== hash(password)) {
                const error = new Error('Incorrect username / password');
                error.statusCode = 409;
                throw error;
            }
            else if (account && account.passwordHash === hash(password)) {
                const { sessionId } = account;

                return setSession({ username, res, sessionId });
            }
        })
        .then((message) => {
            res.json(message)
        })
        .catch(error => next(error))
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    })
        .then(() => {
            res.clearCookie('sessionString');

            res.json({ message: 'Successful logout.' })
        })
        .catch(error => next(error));
});

module.exports = router;