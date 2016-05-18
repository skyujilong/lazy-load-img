/**
 * Created by sina on 2016/5/16.
 */

var path = require("path");
var webpack = require('webpack');
module.exports = {
    devtool: '#inline-source-map',
    entry: {
        index:'index'
    },
    output: {
        path: path.resolve(__dirname),
        filename: "[name].js",
        library: "lazy-load-img",
        libraryTarget:"commonjs"//对外输出格式
    },
    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['.js',''],
        modulesDirectories: ['node_modules'],
        alias:{
        }
    },
    module:{
        loaders: [
            {test:/\.(jsx|js)$/,loader:'babel',exclude:/(node_modules|bower_components)/,query:{presets:['es2015'],plugins:['transform-runtime']}}
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()//变异错误不打断主线程
    ]
};