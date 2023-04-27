const mysql2 = require('mysql2')

// 1.创建一个连接
const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219',
  connectionLimit: 5
})

// 2.定义操作语句
const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

connectionPool.execute(statement, [1000, 0], (err, values) => {
  console.log('values:', values)
  connectionPool.destroy()
})
