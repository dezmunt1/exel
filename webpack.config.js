const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinCssExtractWebpackPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const bundleName = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`;

const jsLoaders = () => {
  const loaders = ['babel-loader']


  if (isDev) {
    loaders.push( 'eslint-loader' )
  }
  return loaders
}

module.exports = {
  context: path.resolve( __dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: bundleName( 'js' ),
    path: path.resolve( __dirname, 'dist')
  },
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      '@': path.resolve( __dirname, 'src' ),
      '@core': path.resolve( __dirname, 'src/core' ),
    }
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin,
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve( __dirname, 'src/favicon.ico' ),
        to: path.resolve( __dirname, 'dist' ),
      }]
    }),
    new MinCssExtractWebpackPlugin({
      filename: bundleName( 'css' )
    })

  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MinCssExtractWebpackPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  }
}
