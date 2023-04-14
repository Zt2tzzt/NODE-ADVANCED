const express = require('express')

const app = express()

// 1.注册两个普通的中间件
app.use((req, res, next) => {
  console.log('normal middleware01')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware02')
  next()
})


// 2.注册路径 path / method 的中间件
app.get('/home', (req, res, next) => {
  console.log('/home get middleware01')
  next()
}, (req, res, next) => {
  console.log('/home get middleware02')
  next()
})

app.post('/login', (req, res, next) => {
  console.log('/login post middleware')
  next()
})


// 3.注册普通的中间件
app.use((req, res, next) => {
  console.log('normal middleware03')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware04')
})


app.listen(9000, () => {
  console.log('express 服务器启动成功~')
})

/**
 * 发送 GET http://localhost:9000/home 的打印
 * 
 * express 服务器启动成功~
 * normal middleware01
 * normal middleware02
 * /home get middleware01
 * /home get middleware02
 * normal middleware03
 * normal middleware04
 */

/**
 * 发送 POST http://localhost:9000/login 的打印
 * 
 * normal middleware01
 * normal middleware02
 * /login post middleware
 * normal middleware03
 * normal middleware04
 */
