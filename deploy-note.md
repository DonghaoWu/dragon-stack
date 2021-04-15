1. create a new repo in github.

2. create a new folder in local.

3. open VS code, open the new local folder.

4. paste the commands.

```bash
% echo "# dragon-stack-heroku" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/DonghaoWu/dragon-stack-heroku.git
git push -u origin main

% npm init
% npm i concurrently
```

5. Add .gitignore file

```bash
# Dependency directories
node_modules/
jspm_packages/
secrets/

# dotenv environment variables file
.env
.env.test
```

----------------------------- *Back End* ----------------------------
1. create a folder called `backend` 

2. 
```bash
% cd backend
% npm init
% npm i base-64 body-parser cookie-parser cors crypto-js express pg uuid dotenv
% npm i nodemon --save-dev
```

3. Add backend code and files.

```diff
+ ./app
+ ./bin
+ ./data
+ ./databaseConnection.js
+ ./.env
```

- ./backend/.env

```bash
STRING_HASH_SECRET = 'hello'

POSTGRE_USER = 'noah'

POSTGRE_HOST= 'localhost'

POSTGRE_LOCAL_DATABASE= 'dragonstackdb'

POSTGRE_PASSWORD= '12345'

POSTGRE_PORT= 5432
```

4. 本地数据库的设置和链接文件一览。 需要说明的是最初的版本使用的是 pool 模式连接 database， 因为 heroku 的免费版本不支持 pool， 所以改用 client 模式连接。

- `以下是 本地 pool 模式的设置`

- ./databaseConnection.js (local pg pool connection)

```js
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
```

- ./bin/configure_db_local.sh (run local sql file with local credentials)

```bash
#!/bin/bash

export PGPASSWORD='12345'

echo "Configuring dragonstackdb..."

dropdb -U noah dragonstackdb
createdb -U noah dragonstackdb

psql -U noah dragonstackdb < ./bin/sql/account.sql
psql -U noah dragonstackdb < ./bin/sql/generation.sql
psql -U noah dragonstackdb < ./bin/sql/dragon.sql
psql -U noah dragonstackdb < ./bin/sql/trait.sql
psql -U noah dragonstackdb < ./bin/sql/dragonTrait.sql
psql -U noah dragonstackdb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits_pool.js

echo "dragonstackdb configured!"
```

5. Testing backend scripts locally.

```bash
% npm run configure-dev-local
```

----------------------------- *Front End* ---------------------------

1. front end
```bash
% cd ..
% npx create-react-app frontend
% cd frontend
% npm i bootstrap react-bootstrap moment react-moment redux react-redux redux-thunk react-router react-router-dom
% npm i redux-devtools-extension --save-dev
```

2. Add front end code and files

```diff
+ ./public
+ ./src
```

3. Testing frontend scripts locally.
```bash
% cd frontend
% npm start
```

4. Testing fullstack scripts locally.
```bash
% cd .. # root directory
% npm run configure-db-local
% npm run dev
```

----------------------------- *Deploy* ---------------------------

1. change file code

- ./backend/databaseConnection.js

```diff
-require('dotenv').config();
-const { Pool } = require('pg');

-const db = new Pool({
-    user: process.env.POSTGRE_USER,
-    host: process.env.POSTGRE_HOST,
-    database: process.env.POSTGRE_LOCAL_DATABASE,
-    password: process.env.POSTGRE_password,
-    port: process.env.POSTGRE_PORT
-});

-module.exports = db;
```

```js
require('dotenv').config();
const { Client } = require('pg');

const dbSetting = process.env.DATABASE_URL ?
    {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    :
    {
        user: process.env.POSTGRE_USER,
        host: process.env.POSTGRE_HOST,
        database: process.env.POSTGRE_LOCAL_DATABASE,
        password: process.env.POSTGRE_password,
        port: process.env.POSTGRE_PORT
    }

const db = new Client(dbSetting);

module.exports = db;
```

- ./backend/app/models/generation/table.js
```js
const db = require('../../../databaseConnection');

db.connect();// add this line;

class GenerationTable {
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (error, response) => {
                    if (error) return reject(error);

                    const generationId = response.rows[0].id;
                    resolve({ generationId });
                }
            )
        })
    };
}

module.exports = GenerationTable;
```

2. comment out react dev tool

- ./frontend/src/store.js

```js
import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware),
    // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

3. heroku -commands

```bash
$ heroku login 

$ heroku create dragon-stack-2021

$ heroku addons:create heroku-postgresql:hobby-dev --name=dragon-stack-db

$ heroku addons:attach dragon-stack-db --app=dragon-stack-2021
```

5. add env var in heroku ui

```bash
STRING_HASH_SECRET = 'hello'
```

6. 
```bash
git remote -v
heroku git:remote -a dragon-stack-2021
git add .
git commit -m'ready for deploy'
git push heroku main
npm run configure-db-heroku
heroku ps:scale web=1
heroku open
```

----------------------------- *Side note* ---------------------------

1. 本地开启 heroku bash
```bash
# heroku run bash
```

2. 所以，如果你在你的脚本的顶部＃！/ bin / bash，那么你告诉你的系统使用bash作为默认的shell。

3. heroku ps:scale web=0 , 关闭 heroku server。

4. connect heroku in Node.js 

- npm i pg
```js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
```





