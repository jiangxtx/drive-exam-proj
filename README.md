#teacherTrain 师训平台

### 更新解决 Webpack 打包慢的问题

采用一种动态链接库（dll）的思想。

同样的 Webpack 最近也新加入了这个功能：webpack.DllPlugin。使用这个功能需要把打包过程分成两步：
1. 打包ddl包
2. 引用ddl包，打包业务代码   

    配置都在 webpack.config.js 中，具体的实现可百度。   
                        --16.12.06
                        
### antDesign 开发与发布时的矛盾

把第三方库都放在 vendor 时，开发时控制台提示如下信息：   
    `You are using prebuilt antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.`  
开发时无法调用类似“babel-plugin-import”这样的工具，理由如下：  
    `Note that: babel-plugin-import will be not working if you add the library in webpack config vender.`    

折中方案：
* 开发时，把antd 当做第三方库，打包到 vendor 中，以提高开发效率。
* 发布时，从第三方库中移除 antd，同时调用“babel-plugin-import”工具库，降低文件体积。  

参考网址：  
    1. https://www.npmjs.com/package/babel-plugin-import  
    2. https://www.npmjs.com/package/antd  
    
> —jiangxtx — 2016-12-28  
            
### 各个目录简介

#### Config：
主要存放项目的配置文件与信息，方便统一管理。此目录下的文件可能会不定期的需要更新等操作。   
例如：constrants.js 文件中存放的是项目中的常量。

#### Tool：  
旨在封装项目中常用的第三方函数 & 方法等，提升项目的可维护性。  
注意：与需不定期修改的 Config 目录不同，该目录下的文件具备相当的稳定性，除非遇到 JS 运行时的 BUG，否则一般不会更改。   
例如：fetchAjax-wrap.js 封装了 ajax 请求的 fetchAjax 及其常用方法，有利于统一调用、统一维护升级等。  

#### layout：
封装了 bootstrap 的布局特性，提供了 Container, ContainerFluid, Row, Col 等接口服务。  
项目中涉及容器布局的设计，最好均 import 此处提供的服务。如此，有利于后续的变更与维护。

### 项目暂时中止说明

鉴于 `2017.02.22` 日前，另一个项目研修平台需要交工，故而暂时中止该项目的开发。
现阶段，本项目所搭建的全都是静态页面。
1. 首页的几个板块基本搭建完毕；
2. 管理员板块的框架搭建了个大概，后续有待进一步完善；
3. 管理员静态页面，目前只完成了：`首页管理--上传banner图片` 的基本页面展示。

> ——jiangxtx 2017-1-16 19:05

### 分支 learn 简介

分支 learn 上，主要暂时存放学习平台的管理员系统页面开发代码，  
与教师研修（本项目master）没有联系，  
只是共用了一套管理员后台代码，后续要迁移出去。  

> ——jiangxtx 2017-1-17 09:46

