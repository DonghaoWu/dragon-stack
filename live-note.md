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

2/23 will work on front end authentication tomorrow.

