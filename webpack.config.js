var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'index'     : path.join(__dirname,'public/index.js'),
        // 'manage'    : path.join(__dirname,'public/manage.js'),
        //'vendor'    : vendorArr,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: "[name].js",
        library: '[name]'
    },
    /*
    // 第三方库配置-METHOD_1(初级版，已废弃)，等于让 Webpack 知道，对于 react 这个模块就不要打包，直接指向 window.React 就好
    externals: {
        'react': 'React'
    },*/
    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css!less' },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "file-loader" },
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.(jpeg|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets:['react','es2015','react-hmre']
                }
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loader: 'es3ify-loader',
            },
        ],
    },
    resolve:{
        extensions:['','.js','.json','.css','.less'],
        modulesDirectories: [
          'node_modules'
        ]
    },
    /*devServer: {
        hot: true,
        inline: true,
        progress: true,
        host:'0.0.0.0',
        proxy: {
          '/api/!*': {
            target: 'http://192.168.11.123:80',
            // target: 'http://www.c20steam.com',
            // target: 'http://127.0.0.1:8090/',
            secure:false,
            rewrite: function(req) {
              req.url = req.url.replace(/^\/api/, '');
            }
          }
        }
    },*/
    plugins: [
        //代码压缩(webpack内建插件webPack.optimize.UglifyJsPlugin)
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        // 提取库文件(webpack内建插件webPack.optimize.CommonsChunkPlugin)
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['vendor'],    // 将公共模块提取
        //     minChunks: Infinity, //提取所有entry共同依赖的模块
        //     filename:'vendor-lib.js'
        // }),

        /* 第三方库配置-METHOD_3：(高级版)
        new webpack.DllPlugin({
            path: 'manifest.json',  // 这个文件会用于后续的业务代码打包
            name: '[name]',     // dll暴露的对象名，要跟 output.library 保持一致
            context: __dirname
        }),*/
        //打包业务代码
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json') // 用来引入 DllPlugin 输出的 manifest.json 文件。
        }),

        // new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        //     //favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        //     filename: './dist/teacher.html', //生成的html存放路径，相对于path
        //     template: './teacher.html', //html模板路径
        //     inject: 'body', //js插入的位置，true/'head'/'body'/false
        //     hash: true, //为静态资源生成hash值
        //     chunks: ['vendors', 'teacher'],//需要引入的chunk，不配置就会引入所有页面的资源
        //     minify: { //压缩HTML文件
        //         removeComments: true, //移除HTML中的注释
        //         collapseWhitespace: false //删除空白符与换行符
        //     }
        // }),
       // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

