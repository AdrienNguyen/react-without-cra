process.env.NODE_ENV = 'production'
// const path = require('path')
const { default: merge } = require('webpack-merge')
const common = require('./webpack.common')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminWebpack = require('image-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// const { appPublic, appBuild, appHtml } = require('../config/paths')
const { appHtml } = require('../config/paths')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(appPublic, 'static'),
        //             to: path.resolve(appBuild, 'static'),
        //             toType: 'dir',
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.ProgressPlugin({
            modulesCount: 5000,
        }),
    ],
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        // https://github.com/facebook/create-react-app/issues/5358
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    // Added for profiling in devtools
                    // keep_classnames: isEnvProductionProfile,
                    // keep_fnames: isEnvProductionProfile,
                    output: {
                        comments: false,
                        ecma: 5,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        // eslint-disable-next-line camelcase
                        ascii_only: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
            new ImageminWebpack({
                severityError: 'warning', // Ignore errors on corrupted images
                minimizer: {
                    implementation: ImageminWebpack.imageminMinify,
                    options: {
                        plugins: [
                            'imagemin-gifsicle',
                            'imagemin-mozjpeg',
                            'imagemin-pngquant',
                            'imagemin-svgo',
                        ],
                    },
                },
                // Disable `loader`
                loader: false,
            }),
            new HtmlMinimizerPlugin({
                minimizerOptions: {
                    collapseWhitespace: true,
                },
                minify: HtmlMinimizerPlugin.htmlMinifierTerser,
            }),
        ],
    },
    output: {
        publicPath: '',
        pathinfo: true,
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
        clean: true,
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})
