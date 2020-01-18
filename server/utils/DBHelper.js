/* eslint-disable no-console */
// 数据库连接助手
const mysql = require("mysql");

class DBHelper {
  // 获取数据库连接
  getConn() {
    let conn = mysql.createConnection({
      // 数据库连接配置
      host: "localhost",
      port: "3306",
      user: "root",
      password: "xk168",
      database: "test" // 数据库名
    });
    conn.connect();
    return conn;
  }
}

new DBHelper().getConn().query('SELECT * FROM user WHERE id=0', (error) => {
  if(error) throw error;
  console.log("数据库连接成功");
});

module.exports = DBHelper;
