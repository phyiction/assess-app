const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/App.js',
    },
    data: {
      import: [
        './src/data/assessments.json',
        './src/data/temperaments.json',
        './src/data/spiritual_gifts.json',
      ],
    },
    bootstrap: 'bootstrap',
    react: ['react-bootstrap', 'react-router-dom'],
    storage: 'localforage',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/projects/assess-app/',
    clean: true,
  },
  devServer: {
    hot: true,
    open: ['/projects/assess-app/'],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
};
