const mysql2 = require('mysql2')

// 1.创建一个连接
const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219'
})

// 2.定义操作语句
const statement = 'SELECT * FROM `students`;'

// 3.执行操作语句
connection.query(statement, (err, values, fields) => {
  if (err) {
    console.log('查询失败：', err)
  }

  console.log('values:', values)
  /* values: [
    { id: 1, name: 'zzt', age: 18 },
    { id: 2, name: 'tom', age: 22 },
    { id: 3, name: 'lilei', age: 25 },
    { id: 4, name: 'lucy', age: 16 },
    { id: 5, name: 'lily', age: 20 }
  ] */
  
  connection.destroy()
})

