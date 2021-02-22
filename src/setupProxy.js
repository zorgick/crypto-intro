/* eslint-disable */
// @ts-nocheck
const { createProxyMiddleware } = require('http-proxy-middleware');

chttp://onsole.log(process.env.REACT_APP_API_STAND)
module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_STAND,
      changeOrigin: true,
    })
  );
};
