/* eslint-disable no-console */
const express = require("express");
const router = express.Router();

const DBHelper = require("../utils/DBHelper");
const sql = require("../sqlMap");

// 登陆
router.post("/login", (req, res) => {
  let sqlStr = sql.user.select_username;
  let params = req.body;
  let conn = new DBHelper().getConn();
  conn.query(sqlStr, [params.username], (err, result) => {
    console.log(result);
    if (err) {
      res.json(err);
    }
    if (result.length === 0) {
      res.json({
        status: 0,
        msg: "查无此人!"
      });
    } else {
      if(result[0].password == params.password) {
        res.json({
          data: {...result[0]},
          status: 200,
          msg: "登陆成功!"
        });
      } else {
        res.json({
          status: 1,
          msg: "账号或者密码错误!"
        });
      }
    }
  });
  conn.end();
});

module.exports = router;
