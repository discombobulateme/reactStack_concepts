const path = require('path');

module.exports = {
  //this is the directory path
  //we use this to all OS can understand
  //in MAC we can use simply: '/src/index.js'
  entry: path.resolve(__dirname, 'src', 'index.js'),
  //where does the transpilation goes?
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  //connects to webpack development server
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  //creating some rules
  module: {
    rules: [
      //each of this is a diferent loader
      {
        test: /\.js$/, //regular expression that says: look only for js files
        exclude: /node_modules/, //those are node responsability, not webpack
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i, //i = case insensitiv
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },
};