/**
 * Created by dantegg on 16-12-21.
 */
const webpack = require('webpack');

const vendors = [ 'jquery','antd','react','react-dom', 'react-router', 'react-redux', 'redux','react-umeditor']

module.exports = {
    output: {
        path: 'dist',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({     //代码压缩(webpack内建插件webPack.optimize.UglifyJsPlugin)
            compress:{
                warnings:false
            },
            output: {
                comments: false   //去除js中注释
            }
        }),
    ],
};