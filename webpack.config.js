const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
let plugins = [];
let rules = [];
console.log('*********', process.env.NODE_ENV );

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  plugins.push(new HtmlWebpackPlugin({
    template: fs.existsSync('index.html') ? 'index.html' : 'index.html',
    inject: false,
    minify: true,
    compile: true
  }));
} else {
  const index = 'index.html';
  const indexDev = '_' + index;
  plugins.push(new HtmlWebpackPlugin({
    template: fs.existsSync(indexDev) ? indexDev : index,
    inject: false,
    minify: false,
    compile: false
  }));

  rules.push({
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  })
}


module.exports = {
  entry: isProduction ? './dist/index.js' : './src/index.ts',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    publicPath: '/'
  },
  module: {
    rules: rules
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/'
    libraryTarget: 'umd',
  },
  // externals: {'grapesjs': 'grapesjs'},
  plugins: plugins
};
