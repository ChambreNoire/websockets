'use strict';

const path = require('path');
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ],
    output: {
        filename: 'app.[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist/app'),
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.SourceMapDevToolPlugin(
            {
                append: '\n//# sourceMappingURL=[url]',
                filename: '[name].js.map'
            }
        )
    ],
    mode: 'development',
    devtool: false,
    devServer: {
        contentBase: './dist/app',
        port: 9000,
        clientLogLevel: 'debug',
        proxy: [
            {
                context: ['/resources'],
                target: 'http://localhost:9001',
                cookiePathRewrite: '/'
            },
            {
                context: ['/ws'],
                target: 'ws://localhost:9001',
                ws: true,
                cookiePathRewrite: '/'
            }
        ]
    },
}