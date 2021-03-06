const SHA256 = require('crypto-js/sha256');

const { STRING_HASH_SECRET } = require('../../../secrets/index.js')

const hash = (string) => {
    return SHA256(`${STRING_HASH_SECRET}${string}${STRING_HASH_SECRET}`).toString();
}

module.exports = { hash };