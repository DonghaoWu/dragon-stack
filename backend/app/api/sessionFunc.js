const AccountTable = require('../models/account/table');
const { hash } = require('../models/account/hashFunc');
const Session = require('../models/account/session');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if (sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });
            setSessionCookie({ sessionString, res });
            resolve({ message: 'session restored.' })
        }
        else {
            const session = new Session({ username });
            const sessionString = session.toString();

            AccountTable.updateSessionId(
                {
                    sessionId: session.id,
                    usernameHash: hash(session.username)
                }
            )
                .then(() => {
                    setSessionCookie({ sessionString, res });
                    resolve({ username })
                })
                .catch(error => reject(error));
        }
    })
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,// use for check cookie in chrome
        // secure:true // use with https
    });
}

const authenticatedAccount = ({ sessionString }) => {
    // console.log(sessionString, 'method authenticatedAccount');
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const error = new Error('Invalid session.');
            error.statusCode = 400;
            return reject(error);
        }
        else {
            const { username, id } = Session.parse(sessionString);
            // console.log(username, id, '========>username');
            AccountTable.getAccount({ usernameHash: hash(username) })
                .then(({ account }) => {
                    // console.log(account, '====<<<<<<<')
                    const authenticated = account.sessionId === id;
                    if (authenticated) {
                        resolve({ username, currentAccountId: account.id })
                    }
                    else {
                        const error = new Error('No valid session in database or session has logout by other device.');
                        error.statusCode = 440;
                        reject(error);
                    }
                })
                .catch(error => reject(error));
        }
    })
}

module.exports = { setSession, authenticatedAccount };