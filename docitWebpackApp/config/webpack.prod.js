const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var Config = {
    entry:{
        main: "./src/js/main.js"
    },
    mode: "production",
    target: "web",
    output:{
        filename: "main-bundle.min.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    module: {
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                
                exclude: [
                    path.resolve(__dirname, "./node_modules/")
                ],
                options: {
                    presets: ["es2015"]
                },
            },
        ],
    },
    
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins:[]
}

module.exports = Config;
