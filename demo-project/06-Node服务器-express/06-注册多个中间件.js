const express = require('express')

const app = express()

app.get('/home', (req, res, next) => {
  console.log('匹配到 get 方法，/home 路径的中间件1')
  next()
}, (req, res, next) => {
  console.log('匹配到 get 方法，/home 路径的中间件2')
  next()
}, (req, res, next) => {
  console.log('匹配到 get 方法，/home 路径的中间件3')
  next()
},(req, res, next) => {
  console.log('匹配到 get 方法，/home 路径的中间件4')
  res.end('哈哈')
},)

app.listen(9000, () => {
  console.log('express 服务器启动成功了~')
})
