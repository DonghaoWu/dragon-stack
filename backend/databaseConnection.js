require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_LOCAL_DATABASE,
    password: process.env.POSTGRE_password,
    port: process.env.POSTGRE_PORT
});

module.exports = db;