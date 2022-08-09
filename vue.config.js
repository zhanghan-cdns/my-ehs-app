/* eslint-disable indent */
const path = require("path"); // 引入path模块
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

const productionGzipExtensions = ["js", "css"];
const tempTime = new Date();
// 压缩代码并去掉console
module.exports = {
  // 路径前缀
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: `aiur-ehs-dist${tempTime.getTime()}`,
  configureWebpack: {
    plugins: !process.env.VUE_APP_DEL_ASSETS
      ? [
          new CompressionWebpackPlugin({
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: !process.env.VUE_APP_DEL_ASSETS, // 是否删除原资源
          }),
        ]
      : [],
  },
  chainWebpack: (config) => {
    let cesiumSourcePath = "node_modules/mars3d-cesium/Build/Cesium/"; // cesium库目录
    let cesiumRunPath = "./"; // cesium运行时主目录 || './cesium/'

    // 设置路径别名
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@views", resolve("./src/views")); // set第一个参数：设置的别名，第二个参数：设置的路径
    // 忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT",
    });
    // const svgRule = config.module.rule('svg')
    // // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // svgRule.uses.clear()
    // // 添加要替换的 loader
    // svgRule.use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    // set svg-sprite-loader(若依flowable工作流配置需要)
    config.module.rule("svg").exclude.add(resolve("src/assets/svg")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    const entry = config.entry("app");
    entry.add("babel-polyfill").end();
    entry.add("classlist-polyfill").end();
    entry.add("@/mock").end();

    config
      .plugin("webpackDefine")
      .use(webpack.DefinePlugin, [{ CESIUM_BASE_URL: JSON.stringify("./") }]);

    config.plugin("CopyWebpackPlugin").use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            from: path.join(cesiumSourcePath, "Workers"),
            to: path.join(cesiumRunPath, "Workers"),
          },
          {
            from: path.join(cesiumSourcePath, "Assets"),
            to: path.join(cesiumRunPath, "Assets"),
          },
          {
            from: path.join(cesiumSourcePath, "ThirdParty"),
            to: path.join(cesiumRunPath, "ThirdParty"),
          },
          {
            from: path.join(cesiumSourcePath, "Widgets"),
            to: path.join(cesiumRunPath, "Widgets"),
          },
        ],
      },
    ]);
  },
  css: {
    extract: { ignoreOrder: true },
  },
  // 开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 1438,
    proxy: {
      "/api": {
        // 本地服务接口地址
        // target: 'http://localhost',
        // 远程演示服务地址,可用于直接启动项目
        // target: 'http://192.168.1.106',
        target: process.env.VUE_APP_URL,
        ws: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
