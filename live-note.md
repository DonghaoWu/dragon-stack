第一阶段：设定结构， OOP 设计概念。
1. 前期设定

    1. create a repo in github.
    2. open a terminal local.
    3. go to the target directory.
    4. run command: 'git clone `http string`'.
    5. open vs code, open the folder.

    6. option: run shell command: 
        - cmd-shift-p
        - enter 'shell command'
        - choss install code command in path
        - 这样就实现了在当前路径下运行 .code 就可以开启 vs 的功能。注意这个必须在 folder 内，之前的命令都是在 folder 外。
        - 上面的功能只是对于特定路径，而不是全局配置。

    7. 关于文件夹的组织分配。使用前后端分离的结构，参考[https://github.com/DonghaoWu/smart-brain-doc](https://github.com/DonghaoWu/smart-brain-doc)
    8. 创建 package.json：
        ```bash
        $ git init
        $ npm init
        $ git add .
        $ git commit -m'first commit'
        $ git push
        ```

2. 建设后端，set up back end.

    ```bash
    $ mkdir backend
    $ cd backend
    $ npm init -y
    $ touch server.js
    $ touch dragon.js
    ```

    1. Object orented programming
    ```js
    // const DEFAULT_PORPERTIES = {
    //     nickname: 'unnamed',
    //     birthdate: new Date()
    // }

    // 修改的原因：原版是运用在所有类中，修改版是运用在个例中，这是个很常见的注意点。

    const DEFAULT_PORPERTIES = {
        nickname: 'unnamed',
        get birthdate(){
            return new Date();
        }
    }

    class Dragon {
        constructor({ birthdate, nickname } = {}) {
            this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
            this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
        }
    }

    module.exports = Dragon;
    ```
    2. get 的用法是新用法，详细可以查看[https://www.w3schools.com/js/js_object_accessors.asp](https://www.w3schools.com/js/js_object_accessors.asp)

    3. install nodemon

    ```bash
    $ npm i nodemon --save-dev
    ```

    4. add script.

    ```json
    "dev": "nodemon server.js"
    ```

    5. run nodemon
    ```bash
    $ npm run dev
    ```

    6. create `traits.json`

    7. generation, create file `config.js`

    8. generation engine

第一阶段总结：

1. OOP 的方式。
2. object 中 get 的关键字。
3. 定义 class 后使用 constrctuor 和 定义 function
4. 几个关于时间的函数：

    ```js
    new Date();
    setTimeout();
    getTIme();
    clearTimeout();
    Date.now();
    ```

5. 给 setTimeout 赋值在一个变量上面。
6. 使用默认参数建立 class。
7. class 之间的嵌套，这个是一直以来都欠缺的。

第二阶段：express

1. install express.js

    ```bash
    $ npm i express
    ```

2. code organization.

3. change file require path and package.json script

4. clean up code

5. 共享动态生成的全局类

    ```js
    app.locals.engine = engine;
    ```

    ```js
    router.get('/new', (req, res) => {
        res.json({ dragon: req.app.locals.engine.generation.newDragon() });
    });
    ```

第三阶段：database

1. postgreSQL is relational database management system.
2. SQL is a language used to communicate with the data.
3. setup and install PostgreSQL.

    1. install postgreSQL.

    ```bash
    $ 
    ```

    2. 检查能否运用，在任何路径下都可以输入，如果返回 `#` 就没问题。
    ```bash
    $ psql -U postgres
    ```

    3. create a database
    ```bash
    $ createdb -U postgres dragonstackdb // 创建一个 db
    $ psql -U postgres dragonstackdb  // 进入那个 db
    ```

    4. create a user for the new database 并验证。
    ```bash
    $ psql -U postgres dragonstackdb
    dragonstackdb=# CREATE USER noah WITH SUPERUSER PASSWORD '12345'; 
    dragonstackdb=# SELECT * FROM pg_user;
    ```

4. Write generation SQL

    1. GENERATION
    ```sql
    CREATE TABLE generation(
        id          SERIAL PRIMARY KEY,
        expiration  TIMESTAMP NOT NULL
    );
    ```

    2. DRAGON, 这是目前为止最重要的设定。
    ```sql
    CREATE TABLE dragon(
        id              SERIAL PRIMARY KEY,
        birthdate       TIMESTAMP NOT NULL,
        nickname        VARCHAR(64),
        "generationId"  INTEGER,
        FOREIGN KEY     ("generationId") REFERENCES generation(id)
    );
    ```
    - 使用 双引号 是为了强制 postgreSQL 使用 camalCase，默认情况下它是会把全部小写话。

5. configure sql，create a new file `configure_db.sh`

    ```bash
    #!/bin/bash

    echo "Configuring dragonstackdb..."

    dropdb -U noah dragonstackdb
    createdb -U noah dragonstackdb

    psql -U noah dragonstackdb < ./bin/sql/generation.sql
    psql -U noah dragonstackdb < ./bin/sql/dragon.sql

    echo "dragonstackdb configured!"
    ```

6. add a new script

    ```json
        "configure":"./bin/configure_db.sh"
    ```

7. 运行并修复 bug, 增加 configure_db 的权限

    ```bash
    $ chmod +x bin/configure_db.sh
    $ npm run configure
    ```

8. configure_db.sh 中的密码的设置不能用。

9. 获取所有 database 下的 table 列表

    ```bash
    $ psql -U noah dragonstackdb
    dragonstackdb=# \d+ dragon
    dragonstackdb=# \d+ generation
    ```

10. create database pool

    ```bash
    $ cd backend
    $ npm i pg
    ```

11. create a new file 'databasePool.js', and 'databaseConfiguration.js'

12. node-postgres pool verifycation.

13. 任意文件调用 nodemon
    ```bash
    $ ./node_modules/nodemon/bin/nodemon.js databasePool.js
    ```

14. 使用 pg 操作 postgresql

    ```js
    const { Pool } = require('pg');
    const databaseConfiguration = require('./secrets/databaseConfiguration');

    const pool = new Pool(databaseConfiguration);

    module.exports = pool;

    pool.query('SELECT * FROM generation', (error, response) => {
        if (error) return console.log('error', error);

        console.log('response.rows', response.rows);
    })
    ```

第三阶段上半段小结：

1. 安装 postgreSQL
2. 使用 SQL 语言在 terminal 生成 database
3. 使用 SQL 语言在 terminal 生成 database 对应的 user
4. 写 SQL 文件，用来生成 table
5. 写 sh 文件，作为一个 script ，可以一并在 terminal 执行多个 SQL 文件，也即生成多个 table
6. 安装 pg
7. 运用 pg 里面的 pool，进行参数设定，成功连接到 postgreSQL
8. 至此，`用户可以通过 pool.query 等 js 语句操作 database。`


15. 新建一个文件，用来使用 pool.query 把数据加进 database 中。在这里需要加一个备注，在文件中，实际上是把一个函数 class 化，所以使用到关键词 static

```js
const pool = require('../../databasePool');

class GenerationTable {
    static storeGeneration(generation) {
        pool.query('INSERT INTO generation(expiration) VALUES($1)',
            [generation.expiration],
            (error, response) => {
                if (error) return console.log('error', error);
            }
        )
    }
}

module.exports = GenerationTable;
```

- 而如果想只要函数，也是可以的，写成：

```js
const pool = require('../../databasePool');

const storeGeneration = (generation) =>{
    pool.query('INSERT INTO generation(expiration) VALUES($1)',
        [generation.expiration],
        (error, response) => {
            if (error) return console.log('error', error);
        }
    )
}


module.exports = storeGeneration;
```

16. 测试 table 文件。add a new script

    ```json
        "configure-dev":"npm run configure && npm run dev"
    ```

17. 小结，重点是使用 pool.query 函数对 database进行操作。

18. 在 generationTable 中引入 promise， 原因：query 的返回是一个 async 过程，不是马上就能回传数据的。

```js
const pool = require('../../databasePool');

class GenerationTable {
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
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

19. 使用 promise 函数, 把一部分函数包含在 buildNewGeneration 的原因是需要完成了 database 加入动作后对应的其他函数才生效。

```js
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
```

20. 对上一段代码的 async/await 的改编：
```js
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

    async buildNewGeneration() {
        try {
            this.generation = new Generation();

            const data = await GenerationTable.storeGeneration(this.generation)
            this.generation.generationId = data.generationId;

            console.log(this.generation);

            this.timer = setTimeout(() => {
                this.buildNewGeneration()
            }, this.generation.expiration.getTime() - Date.now());
            
        } catch (error) {
            error => console.error(error)
        }
    }
}

module.exports = GenerationEngine;
```

21. 小结，讲述`为什么要建立 promise`，同时如何消化它们。这是个很重要的知识点。！！！

22. dragons with generation ids

    - 在 Dragon class 中加入新属性 generationId
    - 在 Generation class 调用 Dragon 时加入新参数，该参数来自创建成功后 database promise 回传的 generationId。

23. store dragon

24. 两个数据表的关系，一个 generation 内可以生成多个 dragon，所有的 dragon 都有一个 generationId。

25. 备注一下：。/api/dragon/index.js 中，dragonId 是一个回传数据，直接附属在 Dragon 实例中的，是一个数据库的回传数据。

26. error handling in express.js

- 设计
```js
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error',
        message: err.message
    })
})
```

- 应用：
```js
router.get('/new', (req, res, next) => {

    const dragon = req.app.locals.engine.generation.newDragon();
    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => next(error));
});
```


27. store traits

1. create a sql file

```sql
CREATE TABLE trait(
    id              SERIAL PRIMARY KEY,
    "traitType"     VARCHAR NOT NULL,
    "traitValue"    VARCHAR NOT NULL
);
```

2. run the sql file in configure_db.sh

```bash
psql -U noah dragonstackdb < ./bin/sql/trait.sql
```

3. insert all traits into database

```js
const pool = require("../databasePool");
const TRAITS = require("../data/traits.json");

TRAITS.forEach(TRAIT => {
    const traitType = TRAIT.type;
    const traitValues = TRAIT.values;

    traitValues.forEach(traitValue => {
        pool.query(
            `INSERT INTO TRAIT("traitType", "traitValue") VALUES($1, $2) RETURNING id`,
            [traitType, traitValue],
            (error, response) => {
                if(error) console.error(error);

                const traitId = response.rows[0].id;

                console.log(`Inserted trait - id: ${traitId}`)
            }
        )
    });
});
```

- 如此一来所有的 trait 都有对应的 database 存储。
- 要注意的是这里用到的是一个 forEach 接着 pool.query 的操作，`这里不需要使用 promise.all 吗？`

4. 在 configure_db.sh 中运行 insertTraits.js

```bash
node ./bin/insertTraits.js
```

28. trait table and get trait id, 使用 pool.query 查询特定 trait 的 id

```js
const pool = require('../../databasePool');

class TraitTable {
    static getTraitId({ traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2`,
                [traitType, traitValue],
                (error, response) => {
                    if (error) return reject(error);
                    
                    const traitId = response.rows[0].id;
                    resolve({ traitId });
                }
            )
        })
    };
}
module.exports = TraitTable;
```

29. dragon 表跟 trait 表使用一个中间表连接起来，称为 dragonTrait table

```sql
CREATE TABLE dragonTrait(
    "traitId"  INTEGER,
    "dragonId" INTEGER,
    FOREIGN KEY ("traitId")  REFERENCES trait(id),
    FOREIGN KEY ("dragonId") REFERENCES dragon(id)
);
```

30. 在 configure_db.sh 中加入新表

```bash
psql -U noah dragonstackdb < ./bin/sql/dragonTrait.sql
```

31. 存储 dragon traits

- 
```js
dragon.traits.forEach(({ traitType, traitValue }) => {
                        DragonTraitTable.storeDragonTrait({dragonId, traitType, traitValue})
                    })
```

- 要改为 promise.all， 因为在实际使用中需要全部 trait 都储存了才会进行下一步，所以改为：

```js
Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue })
}))
.then(() => resolve({ dragonId }))
.catch(error => reject(error));
```

32. inner join

```sql
select * from dragon Inner join dragonTrait On dragon.id = dragonTrait."dragonId";

select * from trait Inner join dragonTrait On trait.id = dragonTrait."traitId";

select * from dragon Inner join dragonTrait On dragon.id = dragonTrait."dragonId" inner join trait on dragonTrait."traitId" = trait.id;
```

33. get dragon with traits

- get dragon traits
```js
    static getDragonTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `
                SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1
                `,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);
                    resolve(response.rows);
                }
            )
        })
    }
```

- get dragon with traits

```js
const pool = require("../../databasePool");
const DragonTable = require("./table");
const DragonTraitTable = require('../dragonTrait/table')
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            return new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId
            })
        })
        .catch(error => console.error(error));
}

module.exports = getDragonWithTraits;
```


--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------




第三阶段总结： postgreSQL 的使用与设计，最重点的地方。

1. 本章从设计 generation 出发，到 dragon， 到 trait， 到 dragonTrait

2. 先说 generation，它的原型类是 Generation class，调用类是 GenerationEngine，这个调用类包含定时生成和写入 table 的功能。

    - 设计一个 sql 文件：`generation.sql`
    ```sql
    CREATE TABLE generation(
        id          SERIAL PRIMARY KEY,
        expiration  TIMESTAMP NOT NULL
    );
    ```

    - 在 configure_db.sh 中运行：
    ```bash
    psql -U noah dragonstackdb < ./bin/sql/generation.sql
    ```

    - 在调用类中进行写入 table 动作：
    ```js
    const pool = require('../../databasePool');

    class GenerationTable {
        static storeGeneration(generation) {
            return new Promise((resolve, reject) => {
                pool.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
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

3. 然后说 dragon，dragon 的原型类是 Dragon class，调用类是 Generation，把它作为调用类的设计原因是每一个新生的 dragon 都是在一个 generation 有效期内，所以每一个 dragon 都会有一个属性来自 Generation class。

- 这个逻辑的设计有点复杂，Generation class 本身不产生 generationId，但它的调用类 GenerationEngine 在完成调用后还有一个写入 table 的功能，而写入 table 完成之后就会返回一个 id，把它赋值在 generationId 上，这样 Generation 类的 this.generationId 就有了数据，然后调用 Dragon class 就可以写入属性 generationId。

- 这个设计的难点在于，`每当生成一个新的 dragon 都有对应有效的 generationId 可以使用，这也是 OOP 嵌套使用的重点。`

- 上面的调用顺序为：

```js
new GenerationEngine(); // app/index.js

new Generation();
GenerationTable.storeGeneration(generation);
resolve({generationId});
this.generation.generationId = generationId; // generationId 的自动录入 table

API call: /dragon/new,
generation.newDragon();
new Dragon({ generationId: this.generationId });
DragonTable.storeDragon(dragon)
```

- 在操作 DragonTable.storeDragon 的过程中，会涉及到两个 table，一个是 dragon，另外一个是dragonTrait table，还有一个是 trait table。

- 了解了 dragon 的生成流程后，设计 dragon 相关：

    1. 一个 sql 文件： dragon.sql
    ```sql
    CREATE TABLE dragon(
        id              SERIAL PRIMARY KEY,
        birthdate       TIMESTAMP NOT NULL,
        nickname        VARCHAR(64),
        "generationId"  INTEGER,
        FOREIGN KEY     ("generationId") REFERENCES generation(id)
    );
    ```

    2. 在 configure_db.sh 中运行：
    ```bash
    psql -U noah dragonstackdb < ./bin/sql/dragon.sql
    ```

    3. 一个生成类：app/dragon/index.js
    ```js
    const TRAITS = require('../../data/traits.json');

    const DEFAULT_PORPERTIES = {
        dragonId: undefined,
        nickname: 'unnamed',
        generationId: undefined,
        get birthdate() {
            return new Date();
        },
        get randomTraits() {
            const traits = [];
            TRAITS.forEach(TRAIT => {
                const traitType = TRAIT.type;
                const traitValues = TRAIT.values;
                const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
                traits.push({ traitType, traitValue })
            });
            return traits;
        }
    }

    class Dragon {
        constructor({ dragonId, birthdate, nickname, traits, generationId } = {}) {
            this.dragonId = dragonId || DEFAULT_PORPERTIES.dragonId;
            this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
            this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
            this.traits = traits || DEFAULT_PORPERTIES.randomTraits;
            this.generationId = generationId || DEFAULT_PORPERTIES.generationId;
        }
    }

    module.exports = Dragon;
    ```

    4. 一个嵌套在 Generation class 的调用：app/generation/index.js
    ```js
    const { REFRESH_RATE, SECONDS } = require('../config');
    const Dragon = require('../dragon/index');

    const refreshRate = REFRESH_RATE * SECONDS;

    class Generation {
        constructor() {
            this.expiration = this.calculateExpiration();
            this.generationId = undefined;
        }

        calculateExpiration() {
            const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));


            const msUntilExpiration = Math.random() < 0.5
                ? refreshRate - expirationPeriod
                : refreshRate + expirationPeriod

            return new Date(Date.now() + msUntilExpiration)
        }

        newDragon() {
            if (Date.now() > this.expiration) {
                throw new Error('This generation expried on ' + this.expiration);
            }
            return new Dragon({ generationId: this.generationId });
        }
    }

    module.exports = Generation;
    ```

    5. 设计一个 api 调用这个调用类：api/dragon
    ```js
    router.get('/new', (req, res, next) => {
        const dragon = req.app.locals.engine.generation.newDragon();

        DragonTable.storeDragon(dragon)
            .then(({ dragonId }) => {
                dragon.dragonId = dragonId;
                res.json({ dragon });
            })
            .catch(error => next(error));
    });
    ```

    6. 最后是写入 table 动作：dragon/table.js

    ```js
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId") 
                        VALUES($1, $2, $3) RETURNING id`,
                [birthdate, nickname, generationId],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue })
                    }))
                        .then(() => resolve({ dragonId }))
                        .catch(error => reject(error));
                }
            )
        })
    };
    ```

    7. 这里面涉及写入 dragon table 和 DragonTraitTable 的动作，dragon table 的写入比较简单， DragonTraitTable 的设计就要下一小节设计。

4. trait table，从这开始涉及的就比较高阶了。它这里是要把一个 dragon 的所有属性都储存起来。

    - 这里提供的方案是：
        1. 把数组格式的 trait 转化成一个一个格式为 `[traitType:'size', traitValue:'small']`的格式，也就是：

        - 从：

        ```js
        [
            {
                "type": "backgroundColor",
                "values": [
                    "black",
                    "white",
                    "blue",
                    "green"
                ]
            },
            {
                "type": "pattern",
                "values": [
                    "plain",
                    "spotted",
                    "striped",
                    "patchy"
                ]
            },
        ]
        ```

        - 到：
        ```js
        [{traitType:'backgroundColor', traitValue:'black'}]
        [{traitType:'backgroundColor', traitValue:'white'}]
        [{traitType:'backgroundColor', traitValue:'blue'}]
        [{traitType:'backgroundColor', traitValue:'green'}]

        [{traitType:'pattern', traitValue:'plain'}]
        [{traitType:'pattern', traitValue:'spotted'}]
        [{traitType:'pattern', traitValue:'striped'}]
        [{traitType:'pattern', traitValue:'patchy'}]
        ```

        2. 按照上面的格式写进 trait table，先设计 sql 文件： trait.sql

        ```sql
        CREATE TABLE trait(
            id              SERIAL PRIMARY KEY,
            "traitType"     VARCHAR NOT NULL,
            "traitValue"    VARCHAR NOT NULL
        );
        ```

        3. 在把数据写入 table：insertTraits.js

        ```js
        const pool = require("../databasePool");
        const TRAITS = require("../data/traits.json");

        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;

            traitValues.forEach(traitValue => {
                pool.query(
                    `INSERT INTO trait("traitType", "traitValue") VALUES($1, $2) RETURNING id`,
                    [traitType, traitValue],
                    (error, response) => {
                        if(error) console.error(error);

                        const traitId = response.rows[0].id;

                        console.log(`Inserted trait - id: ${traitId}`)
                    }
                )
            });
        });
        ```

        4. 在configure_db.sh 中设定执行文件：

        ```bash
        psql -U noah dragonstackdb < ./bin/sql/trait.sql
        node ./bin/insertTraits.js
        ```

        5. 经过上面的写入个动作之后，所有的 trait 都有一个特有的 ID

5. 最后说 dragonTrait，这是最难的部分，它这里的方案是，dragon 跟 trait 的关系是一对多的关系，即一个 dragon 信息可以对应多个 trait，所以需要建立一个中间表把这种对照关系记录起来，也就是 dragonTrait 表。

    1. 设定一个 sql 文件，难点：`dragonTrait.sql`
    ```sql
    CREATE TABLE dragonTrait(
        "traitId"  INTEGER,
        "dragonId" INTEGER,
        FOREIGN KEY ("traitId")  REFERENCES trait(id),
        FOREIGN KEY ("dragonId") REFERENCES dragon(id)
    );
    ```

    2. 在configure_db.sh 中设定执行文件：

    ```bash
    psql -U noah dragonstackdb < ./bin/sql/dragonTrait.sql
    ```

    3. 注意，这个表是一个中间表，读取时的语句关键词是 `inner join`

    4. 写入 table，需要两个变量，分别是 traitId，dragonId。
    ```js
        static storeDragonTrait({ dragonId, traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            TraitTable.getTraitId({ traitType, traitValue })
                .then(({ traitId }) => {
                    pool.query(
                        `INSERT INTO dragonTrait("traitId", "dragonId") VALUES($1, $2)`,
                        [traitId, dragonId],
                        (error, response) => {
                            if (error) return reject(error);

                            resolve({ dragonId })
                        }
                    )
                })
        })
    }
    ```

    5. 由于一个 dragon 有多个 trait，所以要使用 `Promise.all + map `处理

    ```js
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId") 
                VALUES($1, $2, $3) RETURNING id`,
                [birthdate, nickname, generationId],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue })
                    }))
                    .then(() => resolve({ dragonId }))
                    .catch(error => reject(error));

                }
            )
        })
    };
    ```

    6. `小结：要实现把 dragon 写入 database，需要对三个 table 进行操作， 一个是 dragon table，第二个是  trait table，第三个是 dragonTrait table`，顺序是把一般资料写入 dragon table 之后，获得来自 dragon table 的 dragonId，然后调用 DragonTraitTable.storeDragonTrait，过程中调用 TraitTable.getTraitId，从 trait table 获得 traitId，最后结合 dragonId 和 traitId 把信息存进 dragonTrait table。

    7. 上面是一个逻辑实现的过程，需要 promise 的逻辑一步一步实现，这也是实际开发中最常用的数据库操作，在一个 promise 链中一步步使用新的 promise 最后把所有的结果合并获得结果。

6. 关于获取 dragon 资料。

    - 设计思路：
        1. 从 dragonId 作为参数去查询数据库
        2. 涉及的 table 包括 dragon table，trait table， dragonTrait table
        3. 从 dragon table 读取一般资料，使用 inner join 在 trait table 和 dragonTrait table 中提取对应 trait资料。
        4. 合并一般资料和 trait 资料然后回传。

    - api 设计
    ```js
    router.get('/:dragonId', (req, res, next) => {
        const dragonId = req.params.dragonId;
        console.log(dragonId)
        getDragonWithTraits({ dragonId })
            .then((dragon) => {
                res.json({ dragon })
            })
            .catch(error => next(error))
    })
    ```

    - 获得 dragon 一般资料
    ```js
    static getDragonWithoutTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthdate, nickname, "generationId" FROM dragon WHERE dragon.id=$1`,
                [dragonId],
                (error, response) => {
                    if(error) return reject(error);

                    if(response.rows.length === 0) return reject(new Error('no dragon in this id.'))

                    resolve(response.rows[0]);
                }
            )
        })
    }
    ```

    - 获得 dragon trait 资料，这里使用的是 inner join，也是目前最难的 sql 语句。
    ```js
    static getDragonTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `
                SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1
                `,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);
                    resolve(response.rows);
                }
            )
        })
    }
    ```

    - 合并上面两个资料：

    ```js
    const getDragonWithTraits = ({ dragonId }) => {
        return Promise.all([
            DragonTable.getDragonWithoutTraits({ dragonId }),
            DragonTraitTable.getDragonTraits({ dragonId })
        ])
            .then(([dragon, dragonTraits]) => {
                return new Dragon({
                    nickname: dragon.nickname,
                    birthdate: dragon.birthdate,
                    generationId: dragon.generationId,
                    traits: dragonTraits,
                    dragonId: dragonId
                })
            })
            .catch(error => console.error(error));
    }
    ```

7. 上面是一个很好的处理` 一对多 postgreSQL 存储的例子。`

8. 第三阶段的重点放在几个 table.js 文件和 sql 文件上面。还要熟悉 postgreSQL 回传数据的格式 `response.rows[0].id , response.rows`,尤其是 response.rows 是一个数组形式，格式如下:

    ```js
    [
        { traitType: 'backgroundColor', traitValue: 'green' },
        { traitType: 'build', traitValue: 'slender' },
        { traitType: 'pattern', traitValue: 'striped' },
        { traitType: 'size', traitValue: 'large' }
    ]
    ```

    - 对应的 sql 语句。
    ```sql
    SELECT "traitType", "traitValue"
    FROM trait
    INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
    WHERE dragonTrait."dragonId" = $1
    ```

9. `主要是复习 table 和 sql 的写法。`


第四阶段：frontend

1. 使用 CRA：

    ```bash
    $ npx create-react-app frontend
    $ git add .
    $ git commit -m'working on front-end'
    $ git push
    ```

2. `按这个顺序建立：github repo => git clone local => git init => npm init => backend folder => npx create-react-app frontend，没有出现 git file 冲突的情况`.


3. install dependencies

    ```bash
    $ cd frontend
    $ npm i react-bootstrap redux react-redux redux-thunk react-router-dom
    $ 
    ```

4. set up a proxy, change backend port, install concurrently, add new scripts in root directory.

```json
    "client": "npm start --prefix frontend",
    "server": "npm run configure-dev --prefix backend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
```

5. 
```bash
$ cd ..
$ npm run dev
```

6. 基本的 functional component：
```js
import React, { useState, useEffect } from 'react';

const Generation = () => {
    useEffect(() => {
        fetchGeneration();
    }, [])

    const [generation, setGeneration] = useState({
        generationId: 0,
        expiration: ''
    });

    const fetchGeneration = () => {
        fetch('/generation')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setGeneration(data.generation);
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation;
```

- async/await 版本

```js
import React, { useState, useEffect } from 'react';

const Generation = () => {
    useEffect(() => {
        fetchNextGeneration();

        return clearTimeout(timer)
    }, [])

    const [generation, setGeneration] = useState({
        generationId: '',
        expiration: ''
    });

    const [timer, setTimer] = useState(null)

    const fetchGeneration = async () => {
        try {
            const res = await fetch('generation');
            const data = await res.json();
            setGeneration(data.generation);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchNextGeneration = () => {
        fetchGeneration();

        let delay = new Date(generation.expiration).getTime() - new Date().getTime();

        delay = Math.max(delay, 3000)

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, delay))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation;
```

7. useEffect + setTimeout 的操作不知道是不是好，但这也是处理间隔时间发起请求的一种方案。同时这里也实现了 useEffect = componentDidMount + componentDidUpdate + componentWillUnmount 的功能。

8. Dragon component

```js
import React, { useState, useEffect } from 'react';

const Dragon = () => {
    useEffect(() => {
        fetchDragon();
    }, []);

    const [dragon, setDragon] = useState({
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: []
    });

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const fetchDragon = async () => {
        try {
            const res = await fetch('/dragon/new');
            const data = await res.json();
            setDragon(data.dragon);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <span>Dragon ID: {dragonId}</span>
            <br />
            <span>Generation ID: {generationId}</span>
            <br />
            <span>Nickname: {nickname}</span>
            <br />
            <span>Birthdate: {birthdate}</span>
            <br />

            {
                traits.map((trait,index) => {
                    return (
                        <div key={index}>
                            <span>{`${trait.traitType}: ${trait.traitValue}`}</span>
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dragon;
```

9. 将 Dragon component 拆开。

```js
import React, { useState, useEffect } from 'react';

const DragonAvatar = ({ dragon }) => {
    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    return (
        <div>
            <span>Dragon ID: {dragonId}</span>
            <br />
            <span>Generation ID: {generationId}</span>
            <br />
            <span>Nickname: {nickname}</span>
            <br />
            <span>Birthdate: {birthdate}</span>
            <br />

            {
                traits.map((trait, index) => {
                    return (
                        <div key={index}>
                            <span>{`${trait.traitType}: ${trait.traitValue}`}</span>
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DragonAvatar;
```

10. 安装 react-bootstrap，在 Dragon component 中加入 button。

```js
import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

const Dragon = () => {

    const [dragon, setDragon] = useState({
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: []
    });

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const fetchDragon = async () => {
        try {
            const res = await fetch('/dragon/new');
            const data = await res.json();
            setDragon(data.dragon);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <DragonAvatar dragon={dragon} />
            <Button onClick={fetchDragon}>Create a new dragon</Button>
        </div>
    )
}

export default Dragon;
```

11. 小知识点，上面代码中，无参数情况下两者效果一样的。

```js
<Button onClick={fetchDragon}>Create a new dragon</Button>

<Button onClick={()=>fetchDragon()}>Create a new dragon</Button>
```

12. Working on Dragon avatar image.

```js
import React, { useState, useEffect } from 'react';
import {
    skinny,
    sporty,
    spotted,
    slender,
    patchy,
    plain,
    stocky,
    striped
} from '../assets/index.js';

const propertyMap = {
    backgroundColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        blue: '#0277bd'
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: 100, medium: 200, large: 300, enormous: 400 }
}

const DragonAvatar = ({ dragon }) => {

    const { dragonId, generationId, nickname, birthdate, traits } = dragon;

    const dragonPropertyMap = {};

    traits.forEach(trait => {
        const { traitType, traitValue } = trait;
        dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });

    const sizing = { width: dragonPropertyMap.size, height: dragonPropertyMap.size }

    const dragonImage = () => {
        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{ backgroundColor: dragonPropertyMap.backgroundColor, ...sizing }}></div>
                <img src={dragonPropertyMap.pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }} />
                <img src={dragonPropertyMap.build} className='dragon-avatar-image' style={{ ...sizing }} />
            </div>
        )
    }

    let image = dragonImage();

    return (
        <div>
            <span>Dragon ID: {dragonId}</span>
            <br />
            <span>Generation ID: {generationId}</span>
            <br />
            <span>Nickname: {nickname}</span>
            <br />
            <span>Birthdate: {birthdate}</span>
            <br />

            {
                traits.map((trait, index) => {
                    return (
                        <div key={index}>
                            <span>{`${trait.traitType}: ${trait.traitValue}`}</span>
                            <br />
                        </div>
                    )
                })
            }
            {image}
        </div>
    )
}

export default DragonAvatar;
```


第五阶段：redux

1. redux 的设置可以参考这个 repo：[https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/React%2BRedux%2Bwebpack/Redux-Readme.md](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/React%2BRedux%2Bwebpack/Redux-Readme.md)

2. 关于 redux thunk，可以参考这个：[https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/React%2BRedux%2Bwebpack/Dispatch-Thunk.md](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/React%2BRedux%2Bwebpack/Dispatch-Thunk.md)

3. 重大修复，加入限制条件停止无限 fetch。

```js
import React, { useState, useEffect } from 'react';

const Generation = () => {
    const [generation, setGeneration] = useState({
        generationId: '',
        expiration: ''
    });

    useEffect(() => {
        console.log('run useEffect 1', generation.generationId)
        fetchNextGeneration();

        return clearTimeout(timer)
    }, [generation.generationId])

    const [timer, setTimer] = useState(null)

    const fetchGeneration = async () => {
        console.log('fetch 3');
        try {
            const res = await fetch('generation');
            const data = await res.json();
            setGeneration(data.generation);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchNextGeneration = () => {
        console.log('run next 2');
        fetchGeneration();

        let delay = new Date(generation.expiration).getTime() - new Date().getTime();
        delay = Math.max(delay, 3000)

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, delay))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation;
```

4. 加入 redux之后
```js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generationActions'

const Generation = ({ generation, dispatchGeneration }) => {
    useEffect(() => {
        console.log(new Date())
        fetchNextGeneration();
        return clearTimeout(timer);
    }, [generation.generationId])

    const [timer, setTimer] = useState(null);

    const fetchGeneration = async () => {
        try {
            const res = await fetch('generation');
            const data = await res.json();
            dispatchGeneration(data.generation);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchNextGeneration = () => {
        fetchGeneration();

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, 3000))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        generation: state.generation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchGeneration: (generation) => dispatch(generationActionCreator(generation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generation);
```

5. redux-thunk 就是 dispatch 一个含有 dispatch 为参数的函数如下：

```js
// 一个含有 dispatch 为参数的函数
export const fetchGeneration = dispatch => {
    return fetch('/generation')
        .then(response => response.json())
        .then((data => {
            dispatch(generationActionCreator(data.generation))
        }))
        .catch(error => console.log(error))
}

// dispatch 这个函数，并包装为另外一个函数：
const mapDispatchToProps = dispatch => {
    return {
        dispatchGeneration: () => dispatch(fetchGeneration)
    }
}
```

6. 加入 redux-thunk 之后

```js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator, fetchGeneration } from '../actions/generationActions'

const Generation = ({ generation, dispatchGeneration }) => {
    useEffect(() => {
        fetchNextGeneration();
        return clearTimeout(timer);
    }, [generation.generationId])

    const [timer, setTimer] = useState(null);

    const fetchNextGeneration = () => {
        dispatchGeneration();

        setTimer(setTimeout(() => {
            fetchNextGeneration();
        }, 3000))
    }

    return (
        <div>
            <h3>Generation Id: {generation.generationId}</h3>
            <h4>Expires on: {new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        generation: state.generation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchGeneration: () => dispatch(fetchGeneration)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generation);
```

7. 加入 dragon reducer

    1. 加入 types
    ```js
    export const DRAGON_FETCH_BEGIN = 'DRAGON_FETCH_BEGIN';
    export const DRAGON_FETCH_SUCCESS = 'DRAGON_FETCH_SUCCESS';
    export const DRAGON_FETCH_FAILURE = 'DRAGON_FETCH_FAILURE';
    ```

    2. 加入 actions
    ```js
    import { DRAGON_FETCH_BEGIN, DRAGON_FETCH_SUCCESS, DRAGON_FETCH_FAILURE } from '../types/dragonTypes';

    export const fetchDragon = dispatch => {
        dispatch({ type: DRAGON_FETCH_BEGIN });

        fetch('/dragon/new')
            .then(response => response.json())
            .then((data => {
                if (data.type === 'error') {
                    return dispatch({
                        type: DRAGON_FETCH_FAILURE,
                        payload: data.message
                    })
                }
                else {
                    dispatch({
                        type: DRAGON_FETCH_SUCCESS,
                        payload: data.dragon
                    })
                }
            }))
            .catch(error => {
                dispatch({
                    type: DRAGON_FETCH_FAILURE,
                    payload: error.message
                })
            })
    }
    ```

    3. 加入 reducer
    ```js
    import { DRAGON_FETCH_BEGIN, DRAGON_FETCH_SUCCESS, DRAGON_FETCH_FAILURE } from '../types/dragonTypes';

    const initialState = {
        dragonId: '',
        generationId: '',
        nickname: '',
        birthdate: '',
        traits: [],
        fetchSuccess: false
    }

    const dragonReducer = (state = initialState, action) => {
        switch (action.type) {
            case DRAGON_FETCH_BEGIN:
                return { ...state, fetchSuccess: false };
            case DRAGON_FETCH_SUCCESS:
                return { ...state, fetchSuccess: true, ...action.payload };
            case DRAGON_FETCH_FAILURE:
                return { ...state, fetchSuccess: false, message: action.payload };
            default:
                return state;
        }
    }

    export default dragonReducer;
    ```

    4. 引入到 rootReducer
    ```js
    import dragonReducer from './dragonReducer';
    import generationReducer from './generationReducer';
    import { combineReducers } from 'redux';

    const rootReducer = combineReducers({
        generation: generationReducer,
        dragon: dragonReducer
    });

    export default rootReducer;
    ```

    5. 连接 reducer 到 component
    ```js
    import React, { useState, useEffect } from 'react';
    import { Button } from 'react-bootstrap';
    import DragonAvatar from './DragonAvatar';
    import { connect } from 'react-redux';
    import { fetchDragon } from '../actions/dragonActions'

    const Dragon = ({ dragon, dispatchDragon }) => {
        return (
            <div>
                <Button onClick={dispatchDragon}>Create a new dragon in current generation</Button>
                <DragonAvatar dragon={dragon} />
            </div>
        )
    }

    const mapStateToProps = state => {
        return {
            dragon: state.dragon
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            dispatchDragon: () => dispatch(fetchDragon)
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Dragon);
    ```

第六阶段：在现有框架下添加新的数据库 account table，先完成后端，然后是前端。

第六阶段后端部分：

- 目标: account table
- 步骤:

1. sql table 文件
```sql
CREATE TABLE account(
    id       SERIAL PRIMARY KEY,
    username CHARACTER(64),
    password CHARACTER(64)
);
```
2. 执行 sql 文件，confugure_db.sh
3. 设定 query function
```js
const pool = require('../../databasePool');

class AccountTable {
    static storeAccount(user) {
        const { username, password } = user;

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account(username, password) 
                        VALUES($1, $2) RETURNING id`,
                [username, password],
                (error, response) => {
                    if (error) return reject(error);

                    const userId = response.rows[0].id;

                    resolve({ userId })
                }
            )
        })
    };
}

module.exports = AccountTable;
```
4. 设定 API,
- 安装 dependecy `(好像现在 express 自带 body-parser)`

```bash
$ cd backend
$ npm i body-parser
```
- app/index.js

```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```

```js
const { Router } = require('express');
const AccountTable = require('../account/table');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    AccountTable.storeAccount({ username, password })
        .then(() => res.json({ message: 'sigh up success.' }))
        .catch(error => next(error))
});

module.exports = router;
```

```js
const express = require('express');
const bodyParser = require('body-parser');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(bodyParser.json());

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
```

5. test in postman, content-type:application/json
6. check in sql
```bash
$ psql -U noah dragonstackdb
# select * from account;
```

7. 对 password 和 username 加密。

- 方法： sha256
- npm i crypto-js
- 代码：

- /app/account/helper.js

```js
const SHA256 = require('crypto-js/sha256');

const {APP_SECRET} = require('../../secrets/index.js')

const hash = (string)=>{
    return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
}

module.exports = {hash};
```

- 转变 sql 的定义
```sql
CREATE TABLE account(
    id              SERIAL PRIMARY KEY,
    "usernameHash"  CHARACTER(64),
    "passwordHash"  CHARACTER(64)
);
```

- 转变输入数据：
```js
const pool = require('../../databasePool');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account('usernameHash', 'passwordHash') 
                        VALUES($1, $2) RETURNING id`,
                [usernameHash, passwordHash],
                (error, response) => {
                    if (error) return reject(error);

                    const userId = response.rows[0].id;

                    resolve({ userId })
                }
            )
        })
    };
}

module.exports = AccountTable;
```

```js
const { Router } = require('express');
const AccountTable = require('../account/table');
const {hash} = require('../account/helper.js')

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.storeAccount({ usernameHash, passwordHash })
        .then(() => res.json({ message: 'sigh up success.' }))
        .catch(error => next(error))
});

module.exports = router;
```

- 在 postman 中创建用户，得到：

 id |                           usernameHash                           |                           passwordHash
----+------------------------------------------------------------------+------------------------------------------------------------------
  1 | f5ff206f9bc4ea4c15ffa4c587b0a1efb21f8868610d9c7bb42d8286fd2b023b | 9269d6322d226fdbaafe19ffce32b83f8c8474cc3ecfed18b5703713324094f3
(1 row)

8. 防止重复用户名：

```js
const pool = require('../../databasePool');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account("usernameHash", "passwordHash") 
                        VALUES($1, $2) RETURNING id`,
                [usernameHash, passwordHash],
                (error, response) => {
                    if (error) return reject(error);

                    const userId = response.rows[0].id;

                    resolve({ userId })
                }
            )
        })
    };

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id, "passwordHash" FROM account
            WHERE "usernameHash" = $1`,
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ account: response.rows[0] })
                }
            )
        })
    }
}

module.exports = AccountTable;
```

- 未修改 promise chain
```js
const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js')

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if (!account) {
                AccountTable.storeAccount({ usernameHash, passwordHash })
                    .then(() => res.json({ message: 'sigh up success.' }))
                    .catch(error => next(error))
            }
            else {
                const error = new Error('This username has already been taken.');
                error.statrsCode = 409;
                next(error);
            }
        })
        .catch(error => next(error))
});

module.exports = router;
```

- 修改了 promise chain 版
```js
const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js')

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
        .then(() => res.json({ message: 'sigh up success.' }))
        .catch(error => next(error))
});

module.exports = router;
```

8. account session, 将对话内容暂存

- keep the account authenticated through a session cookie.

- 之前的 app 是使用 jWT 将 userId 转化成 token 然后存在session，用 bcryptjs 修改 password 形态。

- 这个方案是把 username 使用 crypto 变形，配合 uuid 后存在 cookie，同时也适用 crypto 加密 password。

- npm i uuid;
- session.js, generate a session String and verify
```js
const { v4: uuidv4 } = require('uuid');
const { hash } = require('./helper');

const SEPARATOR = '|';

class Session {
    constructor({ username }) {
        this.username = username;
        this.id = uuidv4();
    }

    toString() {
        const { username, id } = this;
        return Session.sessionString({ username, id });
    }

    static parse(sessionString) {
        const sessionData = sessionString.split(SEPARATOR);
        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static verify(sessionString) {
        const { username, id, sessionHash } = Session.parse(sessionString);

        const accountData = Session.accountData({ username, id });

        return hash(accountData) === sessionHash;
    }

    static accountData({ username, id }) {
        return `${username}${SEPARATOR}${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });

        return `${accountData}${SEPARATOR}${hash(accountData)}`;
    }
}

const foo = new Session({ username: 'foo' });

const str = foo.toString();

console.log('parse', Session.parse(str))
console.log('parse', Session.verify(str))

module.exports = Session;
```

- 只使用 jst 对 信息进行加密，那么最关键的地方在于 secret，使用上述方法进行加密，除了 secret 之外，uuid 还有 解密逻辑都是关键,而且这里不对回传的 id 进行加密，所以这里的唯一性建立在 username 上。

- 在api 层面进行 session 操作

```js
const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js');
const Session = require('../account/session.js');

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
        .then(() =>{
            const session = new Session({username});
            const sessionString = session.toString();

            res.cookie('sessionString', sessionString,{
                expire: Date.now() + 3600000,
                httpOnly:true,
                // secure:true // use with https
            });

            res.json({ message: 'sigh up success.' }))

        } 
        .catch(error => next(error))
});

module.exports = router;
```

- 关于 cookie 的语句
```js
res.cookie('sessionString', sessionString,{
    expire: Date.now() + 3600000,
    httpOnly:true,
    // secure:true // use with https
});
```

9. 注册后把 session 的 ID，也即对应的 uuid 写入 account table

- 修改 sql 文件

```sql
CREATE TABLE account(
    id              SERIAL PRIMARY KEY,
    "usernameHash"  CHARACTER(64),
    "passwordHash"  CHARACTER(64),
    "sessionId"     CHARACTER(36)
);
```

- api 逻辑
```js
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
```

- setSession
```js
const setSession = ({ username, res }) => {
    return new Promise((resolve, reject) => {

        const session = new Session({ username });
        const sessionString = session.toString();

        AccountTable.updateSessionId(
            {
                sessionId: session.id,
                usernameHash: hash(username)
            }
        )
            .then(() => {
                res.cookie('sessionString', sessionString, {
                    expire: Date.now() + 3600000,
                    httpOnly: true,
                    // secure:true // use with https
                });
                resolve({ message: 'session created.' })
            })
            .catch(error => reject(error));

    })
}
```

- updateSessionId
```js
static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE account SET "sessionId"=$1 WHERE "usernameHash" = $2`,
            [sessionId, usernameHash],
            (error, response) => {
                if (error) return reject(error);

                resolve();
            }
        )
    })
}
```

10. 关于 log in，不是关于提取 session。

```js
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
                console.log('account exists.')
                return setSession({ username, res });
            }
        })
        .then((message) => {
            res.json(message)
        })
        .catch(error => next(error))
});
```


11. 关于 getAccount 的修改, 使多设备登录的时候共用一个 sessionId，而不是每一个设备登陆都创建新的 sessionId。

- table query 层面, 增加获得 sessionId
```js
static getAccount({ usernameHash }) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT id, "passwordHash", "sessionId" FROM account
        WHERE "usernameHash" = $1`,
            [usernameHash],
            (error, response) => {
                if (error) return reject(error);

                resolve({ account: response.rows[0] })
            }
        )
    })
}
```

- api 层面， 获得 sessionId
```js
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
                const {sessionId} = account;

                return setSession({ username, res, sessionId });
            }
        })
        .then((message) => {
            res.json(message)
        })
        .catch(error => next(error))
});
```

- helper setSession 层面， 使用 sessionId。

```js
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
                    usernameHash: hash(username)
                }
            )
                .then(() => {
                    setSessionCookie({ sessionString, res });
                    resolve({ message: 'session created.' })
                })
                .catch(error => reject(error));
        }
    })
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        // secure:true // use with https
    });
}
```

12. 本部分遗留问题，如何解决 session 过期，目前为止都是只讲述如何在注册和登陆的过程中存储 session，但没有讲述如何提取和使用 session。

```js

```

13. Log out

- npm i cookie-parser
- 这个 middleware 可以实现用 `req.cookies` 获得 cookie 的值
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

```js
const Session = require('../account/session');

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
```

- 注意，整个 logout 过程都是不需要参数，只针对当前在 cookie 的数据进行提取，然后根据提取的数据更改 account table。

- 这个后台 cookie 的多功能是新内容，包括多设备登陆，sessioinId 的设定都是新内容。还有包括 Session class 的多个设定都是有理解的难度。


2/26: working on frontend authentication part.

- Root.js

```js
import React ,{Component} from 'react';
import Home from '/Home';
import AuthForm from './AuthForm';
import {connect} from 'react-redux';

class App extends Component {
    render(){
        return(
            this.props.account.loggedIn ? <Home /> : <AuthForm />
        )
    }
}

const mapStateToProps = state => {
    return{
        account: state.account
    }
}

export default connect(mapStateToProps, null)(App);
```

```js
import React ,{Component} from 'react';
import Generation from './Generation';
import Dragon from './Dragon';

class Home extends Component {
    render(){
        return(
            <div>
                <h2> Dragon Stack</h2>
                <Generation />
                <Dragon />
            </div>
        )
    }
}

export default Home;
```

```js
import React ,{Component} from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';
import {signup, login} from '../actions/account';
import {connect} from 'react-redux';

class AuthForm extends Component {
    state = {username:'', password:''};

    updateUsername = e =>{
        this.setState({username: e.target.value})
    };

    updatePassword = e =>{
        this.setState({password: e.target.value})
    };

    signup = ()=>{
        console.log('click sign up', this.state);

        const {username, password} = this.state;
        this.props.signup({username, password});
    }

    login = ()=>{
        console.log('click login', this.state);

        const {username, password} = this.state;
        this.props.login({username, password});
    }

    render(){
        return(
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FromControl
                        type='text'
                        value='this.state.username'
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                    <FromControl
                        type='password'
                        value='this.state.password'
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                    <div>
                    <Button onClick={this.logn}>Log In</Button>
                    <span> / </span>
                    <Button onClick={this.signup}>Sign up</Button>
                    </div>
                </FormGroup>
                {
                    this.props.account.message ?
                    <div>{this.props.account.message}</div>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        account: state.account
    }
}

const mapDispatch = dispatch =>{
    return{
        signup: ({username, password})=>dispatch(signup({username, password})),
        login: ({username, password})=>dispatch(login({username, password}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
```

- 修改 root 名字为 App

- 修改 server.js

```js
app.use(cors({ origin:'http://localhost:1234', credentials : true}))
```

- 目前在browser 中写 document.cookie 会显示 “”；
- 需要修改 setSessionCookie 中删除 httpOnly。
- 

2/28

1. 在这里觉得统一前后端信息借口很重要，这需要总结的时候前后端一起对接审视。

2. logout button

```js
import React ,{Component} from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import {Button} from 'react-bootstrap';
import {logout} from '../actions/account';
import {connect} from 'react-redux';

class Home extends Component {
    render(){
        return(
            <div>
            <Button className='logout-button' onClick={this.props.logout}>Log out</Button>
                <h2> Dragon Stack</h2>
                <Generation />
                <Dragon />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch=>{
    logout:()=>dispatch(logout)
}

export default connect(null, mapDispatchToProps)Home;
```

```css
.logout-button{
    position:absolute;
    right:30px;
    top:30px;
}
```

3. get authenticated request

```js
router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error('Invalid session');
        error.statusCode = 400;
        return next(error);
    }
    else {
        const { username, password } = Session.parse(sessionString);
        AccountTable.getAccount({ usernameHash: hash(username) })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
                res.json({ authenticated })
            })
            .catch(error => next(error));
    }
})
```

4. Guard renderibng behind authenticated check

```js
export const fetchAuthenticated = dispatch => {

    fetch('/account/authenticated', {
        credential: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_AUTHENTICATED_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_AUTHENTICATED_SUCCESS,
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_AUTHENTICATED_FAILURE,
                payload: error.message
            })
        })
}
```

5. invoke the function.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {fetchAuthenticated} from './actions/account';

stroe.dispatch(fetchAuthenticated())
.then(()=>{
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
})


```

6. frontend button clicked to hide error in AuthForm

```js

```
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
--------------------------------------------------------------
//////////////////////////////////////////////////////////////

- 3/5 Account dragons

1. accountDragon.sql

```sql
CREATE TABLE accountDragon(
  "accountId" INTEGER REFERENCES account(id),
  "dragonId"  INTEGER REFERENCES dragon(id),
  PRIMARY KEY ("accountId", "dragonId")
);
```

2. run the sql file

```diff
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
+ psql -U noah dragonstackdb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo "dragonstackdb configured!"
```

3. add an insert function in the table

```js
const pool = require('../../../databasePool');

class AccountDragonTable {
    static storeAccountDragon({ accountId, dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) reject(error);

                    resolve()
                }
            )
        })
    }
    static getAccountDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
                [accountId],
                (error, response) => {
                    if (error) reject(error);

                    resolve({ accountDragons: response.rows })
                }
            )
        })
    }
}
module.exports = AccountDragonTable;
```

4. add a route to handle the store action.

- 示范如何拆开一个 promise api

- 原型：

```js
router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    if (!sessionString || !Session.verify(sessionString)) {
        const error = new Error('Invalid session.');
        error.statusCode = 400;
        return next(error);
    }
    else {
        const { username, id } = Session.parse(sessionString);
        AccountTable.getAccount({ usernameHash: hash(username) })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
                if(authenticated){
                    return res.json({ username });
                }
                else{
                    const error = new Error('Session expired or has logout by other device.');
                    error.statusCode = 440;
                    return next(error);
                }
            })
            .catch(error => next(error));
    }
});
```

- 改造后：
```js
const {setSession,authenticatedAccount} = require('./sessionFunc');

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
        .then(({ username }) => {
            return res.json({ username })
        })
        .catch(error => next(error))
});
```

```js
const authenticatedAccount = ({ sessionString }) => {
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const error = new Error('Invalid session.');
            error.statusCode = 400;
            return reject(error);
        }
        else {
            const { username, id } = Session.parse(sessionString);
            AccountTable.getAccount({ usernameHash: hash(username) })
                .then(({ account }) => {
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
```


```js
const { authenticatedAccount } = require('./sessionFunc');
const AccountDragonTable = require('../models/accountDragon/table');

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
        .then(({ currentAccountId }) => {
            accountId = currentAccountId;
            dragon = req.app.locals.engine.generation.newDragon();
            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => {
            return res.json({ dragon })
        })
        .catch(error => next(error));;
});
```

- add code in front end, credentials:'includes';允许传送 user session 到后端。

```js
import { DRAGON_CREATE_BEGIN, DRAGON_CREATE_SUCCESS, DRAGON_CREATE_FAILURE } from '../types/dragonTypes';

export const createDragon = dispatch => {
    dispatch({ type: DRAGON_CREATE_BEGIN });

    return fetch('/dragon/new', { credentials: 'include' })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: DRAGON_CREATE_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: DRAGON_CREATE_SUCCESS,
                    payload: data.dragon
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: DRAGON_CREATE_FAILURE,
                payload: error.message
            })
        })
}
```

5. get account dragon, 心得，new promise 中的 reject 和 resolve 都不需要加上 return 关键词。

```js
    static getAccountDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1',
                [accountId],
                (error, response) => {
                    if (error) reject(error);

                    resolve({ accountDragons: response.rows })
                }
            )
        })
    }
```

- build a api
- 3/5 `对这个过程的建议： 1。 使用 rest API 2. 使用 authenticated middleware 3. 使用 proxy 4. 使用jwt 5. 使用更好格式的 redux 6. new promise 不用 return 在 reject 和 resolve 7. res.json 应该要使用 return。`

```js
const getWholeDragon = require('../models/dragon/getWholeDragon');

router.get('/dragons', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ currentAccountId }) => {
            return AccountDragonTable.getAccountDragons({ accountId: currentAccountId })
        })
        .then(({ accountDragons }) => {
            return Promise.all(
                accountDragons.map(accountDragon => {
                    return getWholeDragon({ dragonId: accountDragon.dragonId });
                })
            );
        })
        .then(dragons => {
            return res.json({ dragons });
        })
        .catch(error => next(error));
});
```

6. 上面使用到的是复合使用 `promise.all`，也就是说在 promise.all 中的 map 中还有一个 promise.all

7. front end fetch account dragon data

- types
```js
export const ACCOUNT_DRAGON_FETCH_BEGIN = 'ACCOUNT_DRAGON_FETCH_BEGIN';
export const ACCOUNT_DRAGON_FETCH_SUCCESS = 'ACCOUNT_DRAGON_FETCH_SUCCESS';
export const ACCOUNT_DRAGON_FETCH_FAILURE = 'ACCOUNT_DRAGON_FETCH_FAILURE';
```

- actions
```js
import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';

export const fetchAccountDragons = dispatch => {
    dispatch({ type: ACCOUNT_DRAGON_FETCH_BEGIN });

    return fetch('/dragon/dragons', { credentials: 'include' })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: ACCOUNT_DRAGON_FETCH_SUCCESS,
                    payload: data.dragons
                })
            }
        }))
        .catch(error => {
            dispatch({
                type: ACCOUNT_DRAGON_FETCH_FAILURE,
                payload: error.message
            })
        })
}
```

- `为什么原作中会有一个 fetchState，个人认为是作者为了统一管理所有 fetch action 的状态而设定的`
- reducers
```js
import { ACCOUNT_DRAGON_FETCH_BEGIN, ACCOUNT_DRAGON_FETCH_FAILURE, ACCOUNT_DRAGON_FETCH_SUCCESS } from '../types/accountDragonTypes';

const initialState = {
    dragons: [],
    message: ''
}

const accountDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_DRAGON_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_DRAGON_FETCH_FAILURE:
            return { ...state, message: action.payload }
        case ACCOUNT_DRAGON_FETCH_SUCCESS:
            return { ...state, dragons: action.payload }
        default:
            return state;
    }
}

export default accountDragonReducer;
```

```js
import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer
});

export default rootReducer;
```

8. display account dragons in frontend

```js
import React, { Component } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Button } from 'react-bootstrap';
import { logout } from '../actions/accountActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <div className='logout-button'>
                    <span className='username'>Hello, {this.props.account.username}</span>
                    <Button onClick={this.props.logout}>Log out</Button>
                </div>
                <div className='home-container'>
                    <h2> Dragon Stack</h2>
                    <Generation />
                    <Link to='/account-dragons'>My Dragons List</Link>
                    <br />
                    <Dragon />
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountDragons } from '../actions/accountDragonActions';
import AccountDragonRow from './AccountDragonRow';
import { Link } from 'react-router-dom';

class AccountDragons extends Component {

    componentDidMount() {
        this.props.fetchAccountDragons();
    }

    render() {
        return (
            <div>
                <Link to='/'>Back Home</Link>
                <h3>My Dragons List</h3>
                <div className='dragons-container'>
                    {
                        this.props.accountDragons.dragons.map(dragon => {
                            return (
                                <div key={dragon.dragonId}>
                                    <AccountDragonRow dragon={dragon} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountDragons: state.accountDragons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDragons);
```

- render account dragons in row
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../actions/accountDragonActions';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        nickname: this.props.dragon.nickname,
        edit: false
    }

    handleChange = e => {
        this.setState({ nickname: e.target.value });
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    alert(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(`Your dragon nickname is successfull changed from [${this.state.currentNickname}] to [${this.state.nickname}]`);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-nickname'>
                    <input
                        type='text'
                        value={this.state.nickname}
                        onChange={this.handleChange}
                        disabled={!this.state.edit}
                    />
                    {
                        this.state.edit ?
                            <button onClick={this.saveChange}>Save</button>
                            :
                            <button onClick={this.openEditMode}>Edit</button>
                    }
                </div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(null, mapDispatchToProps)(AccountDragonRow);
```

9. react-router, 使用 Link 而不使用 a tag

- install deps

```bash
$ npm i history react-router
```

- 备注， 使用了 BrowserRouter as Router, 就不用安装 history 了。

```diff
+ import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

- import { createBrowserHistory } from 'history';
- const history = createBrowserHistory();
- <Router history={history}>
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { fetchAuthenticated } from './actions/accountActions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AccountDragons from './components/AccountDragons';


const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/' }} />
  }
  const { component, path } = props;

  return <Route path={path} component={component} />
}

store.dispatch(fetchAuthenticated)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Switch>
              <AuthRoute path='/account-dragons' component={AccountDragons} />
              <Route exact path='/' component={App} />
            </Switch>
          </Router>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
```

10. Update Dragon nickname, database part

```js
    static updateDragonNickname({ dragonId, nickname }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE dragon SET nickname = $1 WHERE id = $2`,
                [nickname, dragonId],
                (error, response) => {
                    if (error) reject(error);

                    resolve();
                }
            )
        })
    }
```

- api part
```js
router.put('/update', (req, res, next) => {
    const { dragonId, nickname } = req.body;

    DragonTable.updateDragonNickname({ dragonId, nickname })
        .then(() => {
            res.json({ message: `successfully updated dragon's nickname` })
        })
        .catch(error => next(error));
});
```

- front end form

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../actions/accountDragonActions';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        nickname: this.props.dragon.nickname,
        edit: false
    }

    handleChange = e => {
        this.setState({ nickname: e.target.value });
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    alert(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(`Your dragon nickname is successfull changed from [${this.state.currentNickname}] to [${this.state.nickname}]`);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-nickname'>
                    <input
                        type='text'
                        value={this.state.nickname}
                        onChange={this.handleChange}
                        disabled={!this.state.edit}
                    />
                    {
                        this.state.edit ?
                            <button onClick={this.saveChange}>Save</button>
                            :
                            <button onClick={this.openEditMode}>Edit</button>
                    }
                </div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(null, mapDispatchToProps)(AccountDragonRow);
```

- 修改 dragon name 之后加入一个 fetch dragon 动作

```js
    saveChange = () => {
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    alert(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(`Your dragon nickname is successfull changed from [${this.state.currentNickname}] to [${this.state.nickname}]`);
            })
            .catch(error => {
                alert(error.message)
            })
    }
```

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
--------------------------------------------------------------
//////////////////////////////////////////////////////////////

- 3/7 Dragon ecomony

1. Feature 1:account balances and info

- sql
```sql
CREATE TABLE account(
    id              SERIAL PRIMARY KEY,
    "usernameHash"  CHARACTER(64),
    "passwordHash"  CHARACTER(64),
    "sessionId"     CHARACTER(36),
     balance        INTEGER NOT NULL,
);
```

- config
```js
const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

const REFRESH_RATE = 5;

const STARTING_BALANCE = 50

module.exports = {
    SECONDS,
    MINUTES,
    HOURS,
    DAYS,
    REFRESH_RATE,
    STARTING_BALANCE
};
```

- table
```js
const {STARTING_BALANCE} = require('../config');

    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account("usernameHash", "passwordHash", balance) 
                        VALUES($1, $2, $3) RETURNING id`,
                [usernameHash, passwordHash, STARTING_BALANCE],
                (error, response) => {
                    if (error) return reject(error);

                    const accountId = response.rows[0].id;

                    resolve({ accountId });
                }
            )
        })
    };

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id, "passwordHash", "sessionId", balance FROM account
            WHERE "usernameHash" = $1`,
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    const account = response.rows[0];

                    resolve({ account });
                }
            )
        })
    }
```

- api
```js
router.get('/info',(req, res,next) =>{
    authenticatedAccount({sessionString: req.cookie.sessionString});
    .then(({account})=>{
        res.json({info: {balance:account.balance, username}});
    })
    .catch(error=>next(error));
})
```

```js
const authenticatedAccount = ({ sessionString }) => {
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const error = new Error('Invalid session.');
            error.statusCode = 400;
            return reject(error);
        }
        else {
            const { username, id } = Session.parse(sessionString);
            AccountTable.getAccount({ usernameHash: hash(username) })
                .then(({ account }) => {
                    const authenticated = account.sessionId === id;
                    if (authenticated) {
                        resolve({ username, currentAccountId: account.id, account })
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
```

- get info  这一步可以混合在 login 和 signup 还有 authenticatedAccount 中使用，相当于一个 loadUser 的操作。

2. display account inbfo in frontend.

- types

```js
export const ACCOUNT_INFO_FETCH_BEGIN = 'ACCOUNT_INFO_FETCH_BEGIN';
export const ACCOUNT_INFO_FETCH_SUCCESS = 'ACCOUNT_INFO_FETCH_SUCCESS';
export const ACCOUNT_INFO_FETCH_FAILURE = 'ACCOUNT_INFO_FETCH_FAILURE';
```

- actions
```js
import {} from 'types';

export const fetchAccountInfo = dispatch=>{
        dispatch({ type: ACCOUNT_INFO_FETCH_BEGIN });

    return fetch('/account/info', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_INFO_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: ACCOUNT_INFO_FETCH_SUCCESS,
                    payload: data.info
                })
            }
        }))
        .catch(error => {
            return dispatch({
                type: ACCOUNT_INFO_FETCH_FAILURE,
                payload: error.message
            })
        })
}
```

- reducer
```js
import { ACCOUNT_INFO_FETCH_BEGIN, ACCOUNT_INFO_FETCH_FAILURE, ACCOUNT_INFO_FETCH_SUCCESS } from '../types/accountDragonTypes';

const initialState = {
    info:{}
    message:''
}

const accountInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INFO_FETCH_BEGIN:
            return { ...state }
        case ACCOUNT_INFO_FETCH_FAILURE:
            return { ...state, message: action.payload }
        case ACCOUNT_INFO_FETCH_SUCCESS:
            return { ...state, info: action.payload }
        default:
            return state;
    }
}

export default accountInfoReducer;
```

- root reducer
```js
import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import accountInfoReducer from './accountInfoReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer,
    accountInfo:accountInfoReducer
});

export default rootReducer;
```

- component

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfoActions';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {

    componentDidMount() {
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div>
                <h3>Account Info</h3>
                <div>Username: {this.props.accountInfo.info.username}</div>
                <div>Balance: {this.props.accountInfo.info.balance}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountInfo: state.accountInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountInfo: () => dispatch(fetchAccountInfo)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
```

- parent component
```js
import AccountInfo from './AccountInfo';

<AccountInfo />
```


2. Feature 2: Public and sellable dragon

- sql

- sql
```sql
CREATE TABLE dragon(
    id              SERIAL PRIMARY KEY,
    birthdate       TIMESTAMP NOT NULL,
    nickname        VARCHAR(64),
    "generationId"  INTEGER,
    "isPublic"      BOOLEAN NOT NULL,
    "saleValue"     INTEGER NOT NULL,
    FOREIGN KEY     ("generationId") REFERENCES generation(id)
);
```

- object model
```js
const TRAITS = require('../../../data/traits.json');

const DEFAULT_PORPERTIES = {
    dragonId: undefined,
    nickname: 'unnamed',
    generationId: undefined,
    isPublic: false,
    saleValue: 0,
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            traits.push({ traitType, traitValue })
        });
        return traits;
    }
}

class Dragon {
    constructor({ dragonId, birthdate, nickname, traits, generationId, saleValue, isPublic } = {}) {
        this.dragonId = dragonId || DEFAULT_PORPERTIES.dragonId;
        this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
        this.traits = traits || DEFAULT_PORPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PORPERTIES.generationId;
        this.isPublic = isPublic || DEFAULT_PORPERTIES.isPublic;
        this.saleValue = saleValue || DEFAULT_PORPERTIES.saleValue;
    }
}

module.exports = Dragon;
```

- table
```js
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId, isPublic, saleValue } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId","isPublic", "saleValue") 
                        VALUES($1, $2, $3, $4, $5) RETURNING id`,
                [birthdate, nickname, generationId, isPublic, saleValue],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue })
                    }))
                        .then(() => resolve({ dragonId }))
                        .catch(error => reject(error));
                }
            )
        })
    };

    static getDragonWithoutTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue" FROM dragon WHERE dragon.id=$1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    if (response.rows.length === 0) return reject(new Error('no dragon in this id.'))

                    resolve(response.rows[0]);
                }
            )
        })
    }

    static updateDragon({ dragonId, nickname, public, saleValue }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE dragon SET nickname = $1 "public" = $2 "saleValue" = $3 WHERE id = $4`,
                [nickname, public, saleValue, dragonId],
                (error, response) => {
                    if (error) reject(error);

                    resolve();
                }
            )
        })
    }
```

- update dragon with dynamic queries
```js
    static updateDragon({ dragonId, nickname, isPublic, saleValue }) {
        const settingsMap = { nickname, isPublic, saleValue };

        const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
            if (settingValue !== undefined) {
                return new Promise((resolve, reject) => {
                    pool.query(
                        `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
                        [settingValue, dragonId],
                        (error, response) => {
                            if (error) return reject(error);

                            resolve();
                        }
                    )
                });
            }
        });

        return Promise.all(validQueries);
    }
```

- api
```js
router.put('/update', (req, res, next) => {
    const { dragonId, nickname, isPublic, saleValue } = req.body;

    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
        .then(() => {
            res.json({ message: `successfully updated dragon.` })
        })
        .catch(error => next(error));
});
```

- getWholeDragon

```js
const getWholeDragon = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragonWithoutTraits({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            return new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId,
                saleValue: dragon.saleValue,
                isPublic: dragon.isPublic
            })
        })
        .catch(error => console.error(error));
}
```

- component 

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../actions/accountDragonActions';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        currentSaleValue: this.props.dragon.saleVale,
        currentIsPublic: this.props.dragon.isPublic,
        nickname: this.props.dragon.nickname,
        isPublic: this.props.dragon.isPublic,
        saleValue: this.props.dragon.saleValue,
        edit: false
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckBoxChange = e => {
        this.setState({ isPublic: e.target.checked })
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname,
                    isPublic: this.state.isPublic,
                    saleValue: this.state.saleValue
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    throw new Error(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(
                `Your dragon is successfull changed.
                Nickname: from [${this.state.currentNickname}] to [${this.state.nickname}]
                Sale value: from [${this.state.currentSaleValue}] to [${this.state.saleValue}]
                Public: from [${this.state.currentIsPublic}] to [${this.state.isPublic}]
                `);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-fields'>
                    <span>Nickname:{' '}
                        <input
                            type='text'
                            name='nickname'
                            value={this.state.nickname}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Sale Value:{' '}
                        <input
                            type='number'
                            name='saleValue'
                            value={this.state.saleValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Public:{' '}
                        <input
                            type='checkbox'
                            name='isPublic'
                            checked={this.state.isPublic}
                            onChange={this.handleCheckBoxChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    {
                        this.state.edit ?
                            <button onClick={this.saveChange}>Save</button>
                            :
                            <button onClick={this.openEditMode}>Edit</button>
                    }
                </div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(null, mapDispatchToProps)(AccountDragonRow);
```

2. Get public dragons

- table

```js
const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT id FROM dragon WHERE "isPublic" = TRUE`,
            (error, response) => {
                if (error) reject(error);
                else {
                    const publicDragonRows = response.rows;

                    Promise.all(
                        publicDragonRows.map(({ id }) => {
                            return getWholeDragon({ dragonId: id })
                        })
                    )
                        .then((dragons) => {
                            resolve({ dragons })
                        })
                        .catch(error => reject(error));
                }
            }
        )
    })
}
```

- api

```js
const { getWholeDragon, getPublicDragons } = require('../models/dragon/getDragons');

router.get('/public-dragons', (req, res, next) => {
    getPublicDragons()
        .then(({ dragons }) => {
            return res.json({ dragons })
        })
        .catch(error => next(error));
});
```

- types

```js
export const PUBLIC_DRAGON_FETCH_BEGIN = 'PUBLIC_DRAGON_FETCH_BEGIN';
export const PUBLIC_DRAGON_FETCH_SUCCESS = 'PUBLIC_DRAGON_FETCH_SUCCESS';
export const PUBLIC_DRAGON_FETCH_FAILURE = 'PUBLIC_DRAGON_FETCH_FAILURE';
```

- actions
```js
import { PUBLIC_DRAGON_FETCH_BEGIN, PUBLIC_DRAGON_FETCH_SUCCESS, PUBLIC_DRAGON_FETCH_FAILURE } from '../types/publicDragonsTypes';

export const fetchPublicDragons = (dispatch) => {
    dispatch({ type: PUBLIC_DRAGON_FETCH_BEGIN });

    return fetch('/dragon/public-dragons', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: PUBLIC_DRAGON_FETCH_FAILURE,
                    payload: data.message
                })
            }
            else {
                return dispatch({
                    type: PUBLIC_DRAGON_FETCH_SUCCESS,
                    payload: data.dragons
                })
            }
        }))
        .catch(error => {
            return dispatch({
                type: PUBLIC_DRAGON_FETCH_FAILURE,
                payload: error.message
            })
        })
}
```

- reducer
```js
import { PUBLIC_DRAGON_FETCH_BEGIN, PUBLIC_DRAGON_FETCH_FAILURE, PUBLIC_DRAGON_FETCH_SUCCESS } from '../types/publicDragonsTypes';

const initialState = {
    dragons: []
}

const publicDragonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUBLIC_DRAGON_FETCH_BEGIN:
            return { ...state }
        case PUBLIC_DRAGON_FETCH_FAILURE:
            return { ...state, message: action.payload }
        case PUBLIC_DRAGON_FETCH_SUCCESS:
            return { ...state, dragons: action.payload }
        default:
            return state;
    }
}

export default publicDragonReducer;
```

- root reducer
```js
import dragonReducer from './dragonReducer';
import generationReducer from './generationReducer';
import accountReducer from './accountReducer';
import accountDragonReducer from './accountDragonReducer';
import accountInfoReducer from './accountInfoReducer';
import publicDragonReducer from './publicDragonReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    account: accountReducer,
    generation: generationReducer,
    dragon: dragonReducer,
    accountDragons: accountDragonReducer,
    accountInfo: accountInfoReducer,
    publicDragons: publicDragonReducer
});

export default rootReducer;
```

- parent component index, 这一步可以使用 redux thunk 整合。
```js
import { fetchPublicDragons } from './actions/publicDragonActions';
import PublicDragons from './components/PublicDragons';

store.dispatch(fetchPublicDragons);

<AuthRoute exact path='/public-dragons' component={PublicDragons} />
```

- parent component Home

```js
<Link to='/public-dragons'>Public Dragons</Link>
```

- child component

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragons } from '../actions/publicDragonActions';
import { Link } from 'react-router-dom';
import PublicDragonsRow from './PublicDragonsRow';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
    }

    render() {
        return (
            <div>
                <h3>Public Dragons</h3>
                <Link to='/'>Back home</Link>
                <div className='dragons-container'>
                    {
                        this.props.publicDragons.dragons.map(dragon => {
                            return (
                                <div key={dragon.dragonId}>
                                    <PublicDragonsRow dragon={dragon} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        publicDragons: state.publicDragons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPublicDragons: () => dispatch(fetchPublicDragons)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDragons);
```

- child component

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';

class PublicDragonsRow extends Component {

    render() {
        return (
            <div className='dragon-card'>
                <div>Sale value:{this.props.dragon.saleValue}</div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

export default PublicDragonsRow;
```

3/8 备注信息:
```diff
+ 1. new promise 中，reject 前面要使用 return
+ 2. 增加了 saleValue 和 isPublic 之后，需要在 getWholeDragon 中加入两个属性（这个调试了很久）。
+ 3. input checkbox 依靠的值属性不是 value 而是 chekced。
```

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
--------------------------------------------------------------
//////////////////////////////////////////////////////////////

3/9 last feature, trade dragons.

1. Feature 1: Buy a dragon
- update balance method

```js
    static updateBalance({ accountId, value }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account SET "balance"= balance + $1 WHERE "id" = $2`,
                [value, accountId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        })
    }
```

1. get dragon account and update dragon account

```js
    static getDragonAccount({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "accountId" FROM accountDragon WHERE "dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountId: response.rows[0].accountId })
                }
            )
        })
    }

    static updateDragonAccount({ dragonId, accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE accountDragon SET "accountId" = $1 WHERE "dragonId" = $2`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve()
                }
            )
        })
    }
```

- 是否需要认证发出修改请求的 account， 这是一个关于认证权限的安全，首先要认证对应的 dragon 是否属于 发出请求的 account。

2. buy dragon backend api

```js
router.post('/buy', (req, res, next) => {
    const { dragonId, saleValue } = req.body;

    let buyerId;

    DragonTable.getDragonWithoutTraits({ dragonId })
        .then(dragon => {
            if (dragon.saleValue !== saleValue) {
                throw new Error('Sale value is not correct!');
            }
            if (!dragon.isPublic) {
                throw new Error('Dragon is not public.')
            }
            return authenticatedAccount({ sessionString: req.cookies.sessionString })
        })
        .then(({ account }) => {
            if (!account) {
                throw new Error('Unauthenticated user.')
            }

            if (account.balance < saleValue) {
                throw new Error('Insufficient balance.')
            }

            buyerId = account.id;
            console.log(AccountDragonTable, '=============>')
            return AccountDragonTable.getDragonAccount({ dragonId })
        })
        .then(({ accountId }) => {
            if (accountId === buyerId) {
                throw new Error('Cannot buy your own dragon.')
            }

            const sellerId = accountId;

            return Promise.all([
                AccountTable.updateBalance({
                    accountId: buyerId,
                    value: -saleValue
                }),
                AccountTable.updateBalance({
                    accountId: sellerId,
                    value: saleValue
                }),
                AccountDragonTable.updateDragonAccount({
                    dragonId,
                    accountId: buyerId
                }),
                DragonTable.updateDragon({
                    dragonId,
                    isPublic: false
                })
            ])
        })
        .then(() => res.json({ message: 'Dragon is bought successully!' }))
        .catch(error => next(error));
});
```

- 这是一个很完整的账号互动 promise chain， 最推荐学习这个。

3. buy dragon front end UI.

- component
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';

class PublicDragonsRow extends Component {
    state = {
        displayOptions: false
    };

    toggleDisplayMatingOptions = () => {
        this.setState({ displayOptions: !this.state.displayOptions })
    }

    buy = () => {
        const { dragonId, saleValue } = this.props.dragon;
        fetch(`dragon/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId,
                    saleValue
                }
            )
        })
            .then(response => response.json())
            .then(json => {
                alert(json.message);
                // if(json.type ==='error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <div className='dragon-card'>
                    <div>Sale value:{this.props.dragon.saleValue}</div>
                    <div>Sire value:{this.props.dragon.sireValue}</div>
                    <br />
                    <DragonAvatar dragon={this.props.dragon} />
                    <br />
                    <button onClick={this.buy}>Buy</button>
                    <button onClick={this.toggleDisplayMatingOptions}>Sire</button>
                </div>
                {
                    this.state.displayOptions
                        ?
                        <MatingOptions patronDragonId={this.props.dragon.dragonId} />
                        :
                        <div></div>
                }
            </div>
        )
    }
}

export default PublicDragonsRow;
```

- 这里加了一个 history.push , 它跟 redirect 不一样的地方在于 redirect 不是 mount， history.push 是 mount。`未证实说法`。


2. Feature 2: Siring and Breedering.

- class
```js
const Dragon = require('./index');
const base64 = require('base-64');
class Breeder {
    static breedDragon({ matron, patron }) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;

        const babyTraits = [];

        matronTraits.forEach(({ traitType, traitValue }) => {
            const matronTrait = traitValue;

            const patronTrait = patronTraits.find(
                trait => trait.traitType === traitType
            ).traitValue;

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTrait({ matronTrait, patronTrait })
            })
        })

        return new Dragon({ nickname: 'Unnamed baby', traits: babyTraits })
    }

    static pickTrait({ matronTrait, patronTrait }) {
        if (matronTrait === patronTrait) return matronTrait;

        const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
        const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));

        const randNum = Math.floor(Math.random() * (matronTraitCharSum + patronTraitCharSum));

        return randNum < matronTraitCharSum ? matronTrait : patronTrait;
    }

    static charSum(str) {
        return str.split('').reduce((sum, char) => {
            return sum += char.charCodeAt();
        }, 0)
    }
}

module.exports = Breeder;
```

- pickTrait function

```bash
$ npm i base-64
```

```js
```

- Dragon sire value Backend

- sql
```sql
CREATE TABLE dragon(
    id              SERIAL PRIMARY KEY,
    birthdate       TIMESTAMP NOT NULL,
    nickname        VARCHAR(64),
    "generationId"  INTEGER,
    "isPublic"      BOOLEAN NOT NULL,
    "saleValue"     INTEGER NOT NULL,
    "sireValue"     INTEGER,
    FOREIGN KEY     ("generationId") REFERENCES generation(id)
);
```

- dragon index
```js
const TRAITS = require('../../../data/traits.json');

const DEFAULT_PORPERTIES = {
    dragonId: undefined,
    nickname: 'unnamed',
    generationId: undefined,
    isPublic: false,
    saleValue: 0,
    sireValue: 0,
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValues = TRAIT.values;
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            traits.push({ traitType, traitValue })
        });
        return traits;
    }
}

class Dragon {
    constructor({ dragonId, birthdate, nickname, traits, generationId, saleValue, isPublic, sireValue } = {}) {
        this.dragonId = dragonId || DEFAULT_PORPERTIES.dragonId;
        this.birthdate = birthdate || DEFAULT_PORPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PORPERTIES.nickname;
        this.traits = traits || DEFAULT_PORPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PORPERTIES.generationId;
        this.isPublic = isPublic || DEFAULT_PORPERTIES.isPublic;
        this.saleValue = saleValue || DEFAULT_PORPERTIES.saleValue;
        this.sireValue = sireValue || DEFAULT_PORPERTIES.sireValue;
    }
}

module.exports = Dragon;
```

- table

```js
const pool = require('../../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('./index');

class DragonTable {
    static storeDragon(dragon) {
        const { birthdate, nickname, generationId, isPublic, saleValue, sireValue } = dragon;

        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId","isPublic", "saleValue", "sireValue") 
                        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
                [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue })
                    }))
                        .then(() => resolve({ dragonId }))
                        .catch(error => reject(error));
                }
            )
        })
    };

    static getDragonWithoutTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue" FROM dragon WHERE dragon.id=$1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    if (response.rows.length === 0) return reject(new Error('no dragon in this id.'))

                    resolve(response.rows[0]);
                }
            )
        })
    }

    static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) {
        const settingsMap = { nickname, isPublic, saleValue, sireValue };

        const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
            if (settingValue !== undefined) {
                return new Promise((resolve, reject) => {
                    pool.query(
                        `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
                        [settingValue, dragonId],
                        (error, response) => {
                            if (error) return reject(error);

                            resolve();
                        }
                    )
                });
            }
        });

        return Promise.all(validQueries);
    }
}

module.exports = DragonTable;
```

- getWholeDragon

```js
const getWholeDragon = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragonWithoutTraits({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            return new Dragon({
                nickname: dragon.nickname,
                birthdate: dragon.birthdate,
                generationId: dragon.generationId,
                traits: dragonTraits,
                dragonId: dragonId,
                saleValue: dragon.saleValue,
                isPublic: dragon.isPublic,
                sireValue: dragon.sireValue
            })
        })
        .catch(error => console.error(error));
}
```

- api

```js
router.put('/update', (req, res, next) => {
    const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;

    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
        .then(() => {
            res.json({ message: `successfully updated dragon.` })
        })
        .catch(error => next(error));
});
```

- Dragon sire value Frontend

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import { fetchAccountDragons } from '../actions/accountDragonActions';

class AccountDragonRow extends Component {
    state = {
        currentNickname: this.props.dragon.nickname,
        currentSaleValue: this.props.dragon.saleVale,
        currentIsPublic: this.props.dragon.isPublic,
        nickname: this.props.dragon.nickname,
        isPublic: this.props.dragon.isPublic,
        saleValue: this.props.dragon.saleValue,
        sireValue: this.props.dragon.sireValue,
        edit: false
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckBoxChange = e => {
        this.setState({ isPublic: e.target.checked })
    }

    openEditMode = () => {
        this.setState({ edit: true });
    }

    saveChange = () => {
        fetch(`/dragon/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname,
                    isPublic: this.state.isPublic,
                    saleValue: this.state.saleValue,
                    sireValue: this.state.sireValue
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                if (data.type === 'error') {
                    throw new Error(data.message);
                }
                else {
                    return this.props.fetchAccountDragons();
                }
            })
            .then(() => {
                this.setState({ edit: false });
                alert(
                    `Your dragon is successfull changed.
                Nickname: from [${this.state.currentNickname}] to [${this.state.nickname}]
                Sale value: from [${this.state.currentSaleValue}] to [${this.state.saleValue}]
                Public: from [${this.state.currentIsPublic}] to [${this.state.isPublic}]
                `);
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div className='dragon-card'>
                <div className='edit-fields'>
                    <span>Nickname:{' '}
                        <input
                            type='text'
                            name='nickname'
                            value={this.state.nickname}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Sale Value:{' '}
                        <input
                            type='number'
                            name='saleValue'
                            value={this.state.saleValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Sire Value:{' '}
                        <input
                            type='number'
                            name='sireValue'
                            value={this.state.sireValue}
                            onChange={this.handleInputChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    <span>Public:{' '}
                        <input
                            type='checkbox'
                            name='isPublic'
                            checked={this.state.isPublic}
                            onChange={this.handleCheckBoxChange}
                            disabled={!this.state.edit}
                        />
                    </span>
                    {
                        this.state.edit ?
                            <button onClick={this.saveChange}>Save</button>
                            :
                            <button onClick={this.openEditMode}>Edit</button>
                    }
                </div>
                <br />
                <DragonAvatar dragon={this.props.dragon} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAccountDragons: () => dispatch(fetchAccountDragons)
    }
}

export default connect(null, mapDispatchToProps)(AccountDragonRow);
```


- Mate dragon request

- api
```js
router.post('/mate', (req, res, next) => {
    const { matronDragonId, patronDragonId } = req.body;
    console.log('========>', matronDragonId, patronDragonId);
    if (matronDragonId === patronDragonId) {
        const error = new Error('Cannot breed with the same dragon!');
        return next(error);
    }

    let matronDragon, patronDragon;
    let matronAccountId, patronAccountId;

    getWholeDragon({ dragonId: patronDragonId })
        .then((dragon) => {
            // console.log(dragon,'1>>>>')
            if (!dragon.isPublic) {
                throw new Error('Mate Dragon must be public.')
            }
            patronDragon = dragon;
            return getWholeDragon({ dragonId: matronDragonId })
        })
        .then((dragon) => {
            // console.log(dragon,'2>>>>')

            matronDragon = dragon;
            return authenticatedAccount({ sessionString: req.cookies.sessionString })
        })
        .then(({ account }) => {
            if (!account) throw new Error('Not authenticated.')

            if (patronDragon.sireValue > account.balance) {
                throw new Error('Sire value exceeds balance.');
            }

            matronAccountId = account.id;
            console.log('========>m', matronAccountId);
            return AccountDragonTable.getDragonAccount({ dragonId: patronDragonId })
        })
        .then(({ accountId }) => {
            console.log('========>', accountId);

            patronAccountId = accountId;

            if (matronAccountId === patronAccountId) {
                throw new Error('Cannot breed your own dragons!');
            }

            const dragon = Breeder.breedDragon({ matron: matronDragon, patron: patronDragon });

            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            Promise.all([
                AccountTable.updateBalance({
                    accountId: matronAccountId,
                    value: -patronDragon.sireValue
                }),
                AccountTable.updateBalance({
                    accountId: patronAccountId,
                    value: patronDragon.sireValue
                }),
                AccountDragonTable.storeAccountDragon({
                    dragonId,
                    accountId: matronAccountId
                })
            ])
        })
        .then(() => res.json({ message: 'Mate success!' }))
        .catch(error => next(error));
});
```

- Sire button, front end

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';

class PublicDragonsRow extends Component {
    state = {
        displayOptions: false
    };

    toggleDisplayMatingOptions = () => {
        this.setState({ displayOptions: !this.state.displayOptions })
    }

    buy = () => {
        const { dragonId, saleValue } = this.props.dragon;
        fetch(`dragon/buy`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    dragonId,
                    saleValue
                }
            )
        })
            .then(response => response.json())
            .then(json => {
                alert(json.message);
                // if(json.type ==='error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <div className='dragon-card'>
                    <div>Sale value:{this.props.dragon.saleValue}</div>
                    <div>Sire value:{this.props.dragon.sireValue}</div>
                    <br />
                    <DragonAvatar dragon={this.props.dragon} />
                    <br />
                    <button onClick={this.buy}>Buy</button>
                    <button onClick={this.toggleDisplayMatingOptions}>Sire</button>
                </div>
                {
                    this.state.displayOptions
                        ?
                        <MatingOptions patronDragonId={this.props.dragon.dragonId} />
                        :
                        <div></div>
                }
            </div>
        )
    }
}

export default PublicDragonsRow;
```

- Mating Options

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MatingOptions extends Component {
    mate = ({ matronDragonId, patronDragonId }) => () => {
        fetch('/dragon/mate', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    matronDragonId,
                    patronDragonId
                }
            )
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                alert(json.message);

                // if(json.type !== 'error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <h4>Pick one of your dragons to mate with.</h4>
                {
                    this.props.accountDragons.dragons.map(dragon => {
                        const { dragonId, generationId, nickname } = dragon;
                        return (
                            <span key={dragonId}>
                                <button onClick={this.mate({
                                    matronDragonId: dragonId,
                                    patronDragonId: this.props.patronDragonId
                                })}>G:{generationId}.I:{dragonId}.N:{nickname}</button>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountDragons: state.accountDragons
    }
}

export default connect(mapStateToProps, null)(MatingOptions);
```

- 当一个用户直接进入 public dragon - sire button 时，因为state 没有 accountDragon 的数据，所以不能显示 sire 选项，所以在 react 中有好几个 action 是要一起并发的，不然会造成部分数据缺失的情况。
```js
import { fetchAccountDragons } from '../actions/accountDragonActions';
    componentDidMount() {
        this.props.fetchPublicDragons();
        this.props.fetchAccountDragons();
    }
```

- send mate request

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MatingOptions extends Component {
    mate = ({ matronDragonId, patronDragonId }) => () => {
        fetch('/dragon/mate', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(
                {
                    matronDragonId,
                    patronDragonId
                }
            )
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                alert(json.message);

                // if(json.type !== 'error'){
                //     history.push('/account-dragons');
                // }
            })
            .catch(error => alert(error.message));
    }

    render() {
        return (
            <div>
                <h4>Pick one of your dragons to mate with.</h4>
                {
                    this.props.accountDragons.dragons.map(dragon => {
                        const { dragonId, generationId, nickname } = dragon;
                        return (
                            <span key={dragonId}>
                                <button onClick={this.mate({
                                    matronDragonId: dragonId,
                                    patronDragonId: this.props.patronDragonId
                                })}>G:{generationId}.I:{dragonId}.N:{nickname}</button>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        accountDragons: state.accountDragons
    }
}

export default connect(mapStateToProps, null)(MatingOptions);
```

3. Feature 3 Limit Dragons per generation,` a user can only get a dragon in one generation.`

```js
const { REFRESH_RATE, SECONDS } = require('../../config');
const Dragon = require('../dragon/index');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.accountIds = new Set();
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));


        const msUntilExpiration = Math.random() < 0.5
            ? refreshRate - expirationPeriod
            : refreshRate + expirationPeriod

        return new Date(Date.now() + msUntilExpiration)
    }

    newDragon({accountId}) {
        if (Date.now() > this.expiration) {
            throw new Error('This generation expried on ' + this.expiration);
        }
        if(this.accountIds.has(accountId)){
            throw new Error('You already have a dragon from this generation.');
        }
        this.accountIds.add(accountId);
        return new Dragon({ generationId: this.generationId });
    }
}

module.exports = Generation;
```

- api

```js
router.get('/new', (req, res, next) => {
    let accountId, dragon;
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
        .then(({ currentAccountId }) => {
            accountId = currentAccountId;
            dragon = req.app.locals.engine.generation.newDragon({accountId});
            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => {
            return res.json({ dragon })
        })
        .catch(error => next(error));;
});
```

- component

```js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { connect } from 'react-redux';
import { createDragon } from '../actions/dragonActions'

const Dragon = ({ dragon, createDragon }) => {
    return (
        <div>
            <Button onClick={createDragon}>Create a new dragon in current generation</Button>
            <br />
            <br />
            <div>
                {
                    dragon.createSuccess ?
                        <div className='dragon-card'><DragonAvatar dragon={dragon} /></div>
                        : <div>{dragon.message}</div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dragon: state.dragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createDragon: () => dispatch(createDragon)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dragon);
```

- more features

```diff
Quicker

Frontend: Display the Account Balance, Id, Username, and Log Out Button in a header that stays at the top of app across all pages.

Frontend: Generate action type values with a helper function. This is a level of abstraction we don’t need in the course. But perfect material for a challenge!

Frontend: Use moment-js to display the generation expiration time more prettily.

Frontend: Implement a cancel button in the AccountDragonRow after editing.

Frontend: Color the input differently in AccountDragonRow when it’s disabled

Frontend: Stylize alert message pop ups.

Frontend: Make sure the dragon cannot be public until after a sale value has been given. Use a popup with the alert() function. Or use an alternate kind of blocking behavior.

Frontend: Add confirmation button to buy or mate with a dragon.

Backend: Enforce a limit for how many dragons can be generated in a generation. Base it on how many dragons currently exist. Or impose a maximum number of dragons per generation.

Backend: Reward users with currency for logging in daily.

Backend: Add validations that prevent the saleValue or sireValue from being less than 0.

Backend: Make sure that dragons with a 0 sale or sireValue cannot be made public.

Backend: Generate random names for the dragon instead of ‘unnamed’.

Advanced:

Frontend: Generate an avatar that overlays images for an actual “image” of the dragon based off the traits.

Frontend: Implement a caching layer on the browser that prevents re-fetches if an endpoint hasn’t changed.

Frontend: Use socket.io to implement real time updates of the public-dragons page to avoid races between user to buy dragons.

Conceptual: Design a currency-less system that pays siring fees with a dragon itself. Then trade dragons without cost.

Backend: Extract the get and store functions of the table classes into a framework around node-postgres and express! I could help contribute if it’s open source on Github :)

Backend: Implement a more elegant traitLottery function. Some more randomness could represent real genetics - where you look very similar to your parents, but you have variation.

Backend: Rank each trait according to their statistical chances of beating the other traits in the traitLottery function.

Backend: Optimize storing the multiple traits within the `storeDragon` function as one query, rather than a query that is run multiple times within a loop.

Backend: Add an incremental api endpoint to support pagination for smaller dragon loads. This has the important benefit of not overworking the database.

Backend: Implement a caching layer on the backend that does not have to make new trips to the database for unchanged parts of the database (mark changes with updates).

Backend: Store the unique ids of a generation as a callback when the previous generation expires. This will allow you to batch up the generation ids and store them later on, rather than writing to the database with each new dragon.

Full-stack: Implement unit testing (try Jest)!

Full-stack: Implement browser integration tests!
```

- 3/29 日记：

1. 当一个用户进入 public-dragons 页面时，需要的动作：

    - 加载 public state，也就是重新 fetch，对应  `fetchPublicDragons`
    - 

2. `关于 open buy modal：`当一个用户按下 buy Botton 时，需要的动作：

    - 加载需要购买的 dragon，
    - 清除旧有的 state
    - 改变 state， 打开 modal
    - 打开 modal 后，开始侦测 mousedown 动作，如果有的话，就调用 `handleModalClick` 函数。

3. `关于 close buy modal：`无论用户在 buy modal 是否完成了 buy 动作，当要关闭 modal 时，需要的动作是：
    - 更新 public dragon state，即调用 `fetchPublicDragons`
    - 这个行为需要包含在 componentWillUnmount 之中
    - 解除 eventListener
    - 清除 buy state。

4. 当一个用户购买了 dragon 之后，需要的动作：

    - 修改 accountInfo state
    - dragon 颜色改变， buyDragonState.buyDragonSuccess === true
    - 出现两个按钮，check my draogns / close






3/30:
- 解决了 Generation 中的自动 fetch 问题。

4/2:
- working on mate dragon modal.

4/3:
- working on mate dragon modal.

4/4:
- `redux thunk 中，dispatch 之前加入 return 就可以使 async chainble.`
- [https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/](https://blog.jscrambler.com/async-dispatch-chaining-with-redux-thunk/)

4/5:
- Unexpected token P in JSON at position 0
- response.json() 语句出错，一般是 response.status === 500, solution

```js
export const fetchAuthenticated = dispatch => {
    dispatch({ type: ACCOUNT_AUTHENTICATED_BEGIN });

    return fetch('/account/authenticated', {
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 500) {
                const error = new Error('Unable to connect server.');
                error.statusCode = 500;
                throw (error);
            }
            else return response.json()
        })
        .then((data => {
            if (data.type === 'error') {
                return dispatch({
                    type: ACCOUNT_AUTHENTICATED_FAILURE,
                    payload: data.message
                })
            }
            else {
                dispatch({
                    type: ACCOUNT_AUTHENTICATED_SUCCESS,
                    payload: data.authInfo
                })
                dispatch(fetchAccountInfo);
            }
        }))
        .catch(error => {
            return dispatch({
                type: ACCOUNT_AUTHENTICATED_FAILURE,
                payload: error.message
            })
        })
}
```