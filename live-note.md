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

2. 建设后端