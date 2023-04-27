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

const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

connectionPool
  .promise()
  .execute(statement, [1000, 9])
  .then(res => {
    const [values, fields] = res
    console.log('values', values)
  })
  .catch(err => {
    console.log('err:', err)
  })
