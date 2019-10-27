const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/screen/" : "/",
  assetsDir: "./",
  devServer: {
    proxy: {
      "/imgApi": {
        target: "http://172.16.216.85", // 瓦片
        changeOrigin: true,
        pathRewrite: {
          "^/imgApi": "/"
        }
      },
      "/jsonApi": {
        // target: "http://121.40.9.160", // 3D精细模型-全部3D
        target: "https://hdmapapi.citylink.hzcloudtown.com", // 3D精细模型-全部3D
        changeOrigin: true,
        pathRewrite: {
          "^/jsonApi": "/"
        }
      },
      "/3DTiles": {
        target: "http://mapinner-test.wz-inc.com", // 3D精细模型-楼块3D
        changeOrigin: true,
        pathRewrite: {
          "^/3DTiles": "/"
        }
      },
      "/yunqiApi": {
        target: "http://120.55.234.38",
        // target: "https://cloudfire.citylink.hzcloudtown.com",
        changeOrigin: true,
        pathRewrite: {
          "^/yunqiApi": "/"
        }
      },
      "/bimApi": {
        // target: "http://121.40.88.73",
        target: "https://bim.citylink.hzcloudtown.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/bimApi": "/"
        }
      },
      "/GaodeApi": {
        // target: "http://121.40.9.159",
        target: "https://hdmap.citylink.hzcloudtown.com",
        changeOrigin: true,
        pathRewrite: {
          "^/GaodeApi": "/"
        }
      }
    }
  },

  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  productionSourceMap: false,
  chainWebpack: config => {
    config.externals({
      httpConfig: "httpConfig",
      BMap: "BMap",
      AMap: "AMap",
      AMapUI: "AMapUI"
    });
    config.devServer.set("disableHostCheck", true);
    config.resolve.extensions.add(".vue").add(".scss");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  }
};
