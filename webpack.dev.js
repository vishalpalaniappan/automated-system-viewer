const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    devServer: {
        port: 3011,
        static: "./dist",
    },
});
