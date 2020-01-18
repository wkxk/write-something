// sql语句
var sqlMap = {
  user: {
      // 添加用户
      add: 'insert into user(username, password) values (?, ?)',
      // 查询用户
      select_username: 'select * from user where username like "%"?"%"'
  }
}

module.exports = sqlMap;