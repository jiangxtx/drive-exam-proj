var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
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
    devServer: {
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
    },
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

    ]
};

