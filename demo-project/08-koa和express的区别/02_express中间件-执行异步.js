const express = require('express')
const axios = require('axios')

// 创建app对象
const app = express()

// 编写中间件
app.use(async (req, res, next) => {
  console.log('express middleware01')
  req.msg = 'aaa'
  await next()
  // 返回值结果
  // res.json(req.msg)
})

app.use(async (req, res, next) => {
  console.log('express middleware02')
  req.msg += 'bbb'
  await next()
})

// 执行异步代码
app.use(async (req, res, next) => {
  console.log('express middleware03')
  const resData = await axios.get('http://123.207.32.32:8000/home/multidata')
  req.msg += resData.data.data.banner.list[0].title

  // 只能在这里返回结果
  res.json(req.msg)
})


// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})

// 客户端接收返回的结果："aaabbb焕新女装节"
