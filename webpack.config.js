var HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = __dirname + '/dist';
var SRC_DIR = __dirname + '/src';
var config = {
      mode: 'development',
      //define entry point
      "entry": {
            'index': SRC_DIR + "/index.jsx",
            'feature1/home': SRC_DIR + "/feature1/home.jsx",
            'feature1/user-registration': SRC_DIR + "/feature1/user-registration.jsx",
            'feature2/setting': SRC_DIR + "/feature2/setting.jsx",
            'feature2/viewSetting': SRC_DIR + "/feature2/viewSetting.jsx"
},
      // define output point
      "output": {
            path: BUILD_DIR,
            filename: "[name].js",
            publicPath: "/"
      },
      /* 
         optimization: {
             minimize: true
         },
      */
       devtool: 'eval-source-map',
       devServer: {
             //inline: true,
             contentBase: BUILD_DIR,
             port: 9000
       },
      module: {
            rules: [{
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                              presets: ['es2015', 'react']
                        }
                  },
                  
                  {
                       test: /\.(css|scss)$/,
                       use: [{
                                   loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                  loader: 'sass-loader'
                            }
                        ]
                  }
            ]
      },
      plugins: [
            new HtmlWebpackPlugin({
                  template: './src/index.html'
            })
      ]
};
module.exports = config;