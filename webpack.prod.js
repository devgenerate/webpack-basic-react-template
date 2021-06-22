const { merge } = require("webpack-merge")
const webpackDevConfig = require("./webpack.common")

module.exports = merge(webpackDevConfig)