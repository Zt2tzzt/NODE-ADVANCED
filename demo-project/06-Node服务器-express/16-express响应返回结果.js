const express = require('express')

const app = express()

app.post('/login', (req, res, next) => {
  // 1. end 方法，返回响应。
  res.end('登陆成功，欢迎回来！')
})

app.get('/home', (req, res, next) => {
  // status 方法，设置状态码
  res.status(201)

  // json 方法，返回响应（常用）
  res.json({
    code: 0,
    msg: 'home 数据',
    data: [
      { name: 'abc', price: 666 },
      { name: 'cba', price: 666 },
      { name: 'nba', price: 666 }
    ]
  })
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
