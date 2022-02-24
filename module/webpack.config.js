const path = require('path')

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  mode: 'production',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    publicPath: '/dist/',
  },
  optimization: {
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
}
