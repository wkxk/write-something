/* eslint-disable no-console */
// node后端服务器
// const http = require("http");
const badyParser = require("body-parser");
const express = require("express");
const userApi = require("./api/userApi");

let server = express();

server.use(badyParser.json());
server.use(
  badyParser.urlencoded({
    extended: false
  })
);

// 后端api路由
server.use("/api/user", userApi);

// 启动监听
server.listen(8888, () => {
  console.log("success listen at port: 8888");
});
