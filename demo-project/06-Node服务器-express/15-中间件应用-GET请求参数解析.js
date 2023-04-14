const express = require('express')

const app = express()

// 解析 params 参数
app.get('/users/:id', (req, res, next) => {
  const id = req.params.id
  res.end(`获取到${id}的数据`)
})

// 解析 query 字符串
app.get('/home/list', (req, res, next) => {
  const queryInfo = req.query
  console.log('queryInfo:', queryInfo)
  // { offset: '20', limit: '20' }
  res.end('home list 数据')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})