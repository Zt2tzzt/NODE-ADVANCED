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
const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

// 3.执行操作语句
connection.execute(statement, [1000, 8], (err, values) => {
  console.log('values:', values)
  connection.destroy()
})


