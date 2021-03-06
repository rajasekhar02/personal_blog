const path = require("path");

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule("thejs")
      .test(/\.js$/)
      .include.add(path.resolve("src"))
      .add(path.resolve("node_modules/element-ui/packages"))
      .end()
      .use("babel-loader")
      .loader("babel-loader")
      .end();
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .options({
        inline: "fallback"
      })
      .end();
    config.optimization.splitChunks({ minChunks: 1 });
    config.merge({
      output: {
        globalObject: "this" //"(typeof self !== 'undefined' ? self : this)"
      }
    });
  },
  pages: {
    index: {
      entry: "src/main2.js",
      template: "public/index.html",
      filename: "index.html"
    }
  }
};
