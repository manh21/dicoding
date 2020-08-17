const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/index.js"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    resolve: {
        alias: {
          '~': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ patterns: [{ from: path.resolve(__dirname, '../public'), to: 'public' }] }),
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        })
    ]
};