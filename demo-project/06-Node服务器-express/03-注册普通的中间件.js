const express = require('express')

const app = express()

// 总结: 当 express 接收到客户端发送的网络请求时, 在所有中间中，开始进行匹配。
// 当匹配到第一个符合要求的中间件时, 那么就会执行这个中间件
// 后续的中间件是否会执行， 取决于上一个中间件有没有执行 next

// 通过 use 方法注册的中间件：
// - 是最普通的/简单的中间件
// - 无论是什么请求方式都可以匹配上

// login/get
// login/post
// abc/patch
app.use((req, res, next) => {
  console.log('normal middleware 01') // 打印了
  res.end('返回结果了, 不要等了')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware 02') // 打印了
})


// 开启服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
