const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('express middleware 1')
  req.msg = 'aaa'
  next()
  res.json(req.msg)
})

app.use((req, res, next) => {
  console.log('express middleware 2')
  req.msg += 'bbb'
  next()
})

app.use((req, res, next) => {
  console.log('express middleware 3')
  req.msg += 'ccc'
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})

// 客户端接收到的返回结果 "aaabbbccc"
