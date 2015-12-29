module.exports = {
  entry: {
    main:'./main.js',
    checkout:'./checkout.js'
  },
  output: {
    path: "../public/javascripts/",
    filename: "[name].bundle.js",
    // chunkFilename: "[id].bundle.js",
    publicPath: "/javascripts/"
  },
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      // {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  }
};
