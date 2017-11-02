const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist'])


const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
  favicon: './public/favicon.ico'
})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'bundle.css',
  disable: false,
  allChunks: true
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader : "eslint-loader",
        enforce: "pre"
      },
      { test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["env", "es2015", "react", "stage-0"],
          plugins: ['transform-object-rest-spread', 'transform-runtime', 'transform-runtime', 'transform-async-to-generator']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPluginConfig.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [CleanWebpackPluginConfig, HTMLWebpackPluginConfig, ExtractTextPluginConfig]
}
