const path = require("path");

module.exports = {
    devServer: {
        port: 8080
    },

    pluginOptions: {
      'style-resources-loader': {
          preProcessor: 'scss',
          patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
      }
    }
}
