const express = require('express')

const app = express()

// 解析 body 请求体中的 json 数据，放入 req.body 中。
app.use(express.json()) 

// 解析 body 请求体中的 x-www-form-urlencoded 数据，放入 req.body 中。
// app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true })) // 使用第三方模块 qs，而非内置模块 querstring 来解析 url 中的 query 字符串。

app.post('/home', (req, res, next) => {
  console.log('req.body:', req.body)
  res.end('哈哈')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})

