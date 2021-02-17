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
2. object 中 get 的方式。
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