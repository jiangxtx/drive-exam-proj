/**
 * Created by dantegg on 16-12-21.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件

//const vendorArr = [ 'jquery','antd','react','react-dom', 'react-router', 'react-redux', 'redux','react-umeditor','react-slick']

module.exports = {
    entry: {
        'index'     : path.join(__dirname,'public/index.js'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: "[name].js",
        library: '[name]'
    },

    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.less$/, loader: 'style-loader!css!less' },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "file-loader" },
            {test: /\.json$/,   loader: 'json-loader'},
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
                    presets:['react','es2015']
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

    plugins: [
        //new ExtractTextPlugin("dist/bundle.css"),
        // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
        // 通过设置环境变量来优化代码 for react! It reduces the size of the react lib to ~95kb
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json') // 用来引入 DllPlugin 输出的 manifest.json 文件。
        }),
        new webpack.optimize.UglifyJsPlugin({     //代码压缩(webpack内建插件webPack.optimize.UglifyJsPlugin)
            compress:{
                warnings:false
            },
            output: {
                comments: false   //去除js中注释
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),
    ]
};