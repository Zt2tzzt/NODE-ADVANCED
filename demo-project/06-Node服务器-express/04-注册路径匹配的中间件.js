const express = require('express')

const app = express()

// 注册路径匹配的中间件
app.use('/home', (req, res, next) => {
  console.log('匹配到 /home 路径的中间件')
  res.end('home data')
})
// 路径匹配的中间件，没有对请求方式(method)进行限制

app.listen(9000, () => {
  console.log('express 服务器启动成功')
})
