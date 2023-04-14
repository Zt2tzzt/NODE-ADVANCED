const fs = require('fs')
const morgan = require('morgan') // 导入第三方模块 morgan
const express = require('express')

const app = express()

// 应用第三方中间件
const writeStream = fs.createWriteStream('./logs/access.log') // 先创建该路径下的文件
app.use(morgan('combined', { stream: writeStream }))

app.post('/login', (req, res, next) => {
  res.end('登陆成功，欢饮回来~')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})