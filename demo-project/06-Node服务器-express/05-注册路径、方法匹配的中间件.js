const express = require('express')

const app = express()

app.get('/home', (req, res, next) => {
  console.log('匹配到 get 方法，/home 路径的中间件')
  res.end('home data')
})

app.post('/users', (req, res, next) => {
  console.log('匹配到 post 方法，/users 路径的中间件')
  res.end('create user success')
})

app.listen(9000, () => {
  console.log('express 服务器创建成功~')
})
