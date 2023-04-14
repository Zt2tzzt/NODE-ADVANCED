const express = require('express')
const multer = require('multer')

const formData = multer()

const app = express()

// 使用
app.post('/login', formData.any(), (req, res, next) => {
  console.log('req.body:', req.body)
  // { name: 'zzt', age: '18' } value 值的类型是字符串
  res.end('登录成功，欢迎回来~')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
