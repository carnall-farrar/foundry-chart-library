const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    library: 'cfFoundry',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
