const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

const configPath = '../config'
const paths = require(`${configPath}/paths`)
const { appIndexJs, publicUrlOrPath, appBuild } = paths

const getClientEnviroment = require(`${configPath}/env`)
const env = getClientEnviroment(publicUrlOrPath)

module.exports = {
    entry: appIndexJs,
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]ss|js|ts)/,
                enforce: 'pre',
                loader: 'import-glob',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@/static': path.resolve(__dirname, '../public/static'),
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        // Makes some enviroment variables like %PUBLIC_URL% at index.html
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        // Makes some enviroment variables in JS code
        new webpack.DefinePlugin(env.stringified),
        new WebpackManifestPlugin(),
        new LodashModuleReplacementPlugin(),
    ],
    output: {
        path: appBuild,
        globalObject: 'this',
    },
}
