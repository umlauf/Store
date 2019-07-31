const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: {
    main:'./main.js',
    checkout:'./checkout.js'
  },
  output: {
    // path: "../public/javascripts/",
    path: path.join(__dirname, "../public/javascripts"),
    filename: "[name].bundle.js",
    // chunkFilename: "[id].bundle.js",
    // publicPath: "/javascripts/"
    publicPath: "/javascripts/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader'
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css"
    })
  ],
  devtool: "source-map"
};
