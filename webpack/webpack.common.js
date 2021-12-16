const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

const configPath = '../config'
const paths = require(`${configPath}/paths`)
const { appIndexJs, publicUrlOrPath, appBuild, esLintFile } = paths

const getClientEnviroment = require(`${configPath}/env`)
const env = getClientEnviroment(publicUrlOrPath)

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
)

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
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.jpg$/,
                    /\.gif$/,
                ],
                loader: 'url-loader',
                options: {
                    limit: imageInlineSizeLimit,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
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
            {
                enforce: 'pre',
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: esLintFile,
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
