# 驾照模拟考试平台（移植于另一个现有项目）

## 更新解决 Webpack 打包慢的问题

采用一种动态链接库（dll）的思想。

同样的 Webpack 最近也新加入了这个功能：webpack.DllPlugin。使用这个功能需要把打包过程分成两步：
1. 打包ddl包
2. 引用ddl包，打包业务代码   

配置都在 webpack.config.js 中，具体的实现可百度。
> --16.12.06


## 模拟考试系统平台架构搭建

暂时搭建了架构，暂定两种角色：

+ 管理员：admin、123456；
+ 考生：jack、123456；

> --jiangxtx --2017-4-19 23:20:11

## 整合 NodeJS Express 框架

### 整合 express

在现有的项目中整合 NodeJS Express 框架，即前后台开发都基于 JavaScript 开发了。

前台主要负责页面的渲染与交互处理。后台 express 框架主要负责对题库数据库的增删查改、用户权限信息等操作处理

终端中启动前端的命令：
`npm run start`

终端中启动后台的命令：
`npm run nodeStart`

### Mongoose lib

针对 node-mongodb-native 操作 MongoDB 没有做更深的讲解。
针对它的进行再次封装的东西很多，且更利于编程实现，比如：mongoose、mongoskin 等等，应用性不错；
mongoose的可能用的比较多，一个封装了基于 NodeJS 操作 Mon共DB 数据库的操作库。

### node-dev

可以实现 express 中的热部署，不然每次修改了文件都要重新启动服务。

## 注意项目的模块化设计

此项目中，既包含了前端代码，又包含了后台的nodejs代码。所以，设计时更需要仔细设计了。尤其注意不同目录的意义，以及各个目录下的文件作用。

### bin

### database

### public

### routes

### src (star)

所有涉及到前端的代码，都汇于该目录下；相比较而言，后台的代码量稍少一些，而前端的代码量偏多些。

### views

### app.js

> --jiangxtx --2017-4-27 12:51:10