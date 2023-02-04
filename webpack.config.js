const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/index.jsx',      
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  plugins: [    
    new HtmlWebpackPlugin({
      template: './templates/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,    
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: {
      index: './templates/index.html'
    },
    hot: true
  },
  module: {
    rules: [   
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },   
      {
        test: /\.(scss)$/,
        use: [
          {
            // Creates `style` nodes from JS strings
            loader: 'style-loader'
          },
          {
            // Translates CSS into CommonJS
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require.resolve("sass"),
            },
          },
        ]        
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
