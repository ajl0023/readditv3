const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      onProxyRes: (responseBuffer, proxyRes, req, res) => {
        return responseBuffer.toString("utf8");
      },
    })
  );
};
