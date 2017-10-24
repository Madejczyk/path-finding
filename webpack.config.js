var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry:{
        app: './source/App.js'
    },
    output:{
        filename: 'public/build/bundle.js'
    },
    devtool: '#source-map',

    module:{
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react' , 'es2015']
                }
            }
        ]
    }
}