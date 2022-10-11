'use strict';

const path = require('path');
const { realpathSync } = require('fs')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = realpathSync(process.cwd());

const PORT = process.env.PORT || 9009;
const HOST = process.env.HOST || 'localhost';

module.exports = {
    entry: path.resolve(appDirectory, 'src/index.tsx'),
    output: {
        path: path.resolve(appDirectory, 'dist/app'),
        filename: '[name].[chunkhash].js',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(appDirectory, 'public/index.html')
        })
    ],
    devServer: {
        host: HOST,
        port: PORT,
        hot: true,
        historyApiFallback: true,
        client: {
            logging: 'verbose',
            //webSocketTransport: 'sockjs',
        },
        //webSocketServer: 'sockjs',
        static: path.resolve(appDirectory, 'dist/app'),
        compress: false,
        proxy: {
            '/resources': {
                target: 'http://localhost:9001',
                cookiePathRewrite: '/',
            },
            '/ws': {
                target: 'ws://localhost:9001',
                cookiePathRewrite: '/',
                type: 'ws'
            }
        }
    },
}