// [PROJECT_ROOT]/src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/web", // 호출하는 URL
    createProxyMiddleware({
      target: "http://localhost:3000/", // 대상 URL
      changeOrigin: true,
    })
  );
};