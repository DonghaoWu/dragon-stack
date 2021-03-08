const { Router } = require('express');
const AccountTable = require('../models/account/table');
const { hash } = require('../models/account/hashFunc');
const { setSession, authenticatedAccount } = require('./sessionFunc');
const Session = require('../models/account/session');

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
        .then(({ username }) => {
            res.json({ username })
        })
        .catch(error => next(error))
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);

    AccountTable.getAccount({ usernameHash })
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
        .then(({ username }) => {
            res.json({ username })
        })
        .catch(error => next(error))
});

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
        .then(({ username }) => {
            return res.json({ username })
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

router.get('/info', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account, username }) => {
            res.json({ info: { balance: account.balance, username } });
        })
        .catch(error => next(error));
})

module.exports = router;