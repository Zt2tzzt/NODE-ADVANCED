const express = require('express')

const app = express()

// 案例一：用户登录请求处理
app.post('/login', (req, res, next) => {
  let isLogin = false

  req.on('data', data => {
    // 获取请求中的 json 数据。
    const dataString = data.toString()
    const dataInfo = JSON.parse(dataString)
    if (dataInfo.username === 'zzt' && dataInfo.password === '123') {
      isLogin = true
    }
  })

  req.on('end', () => {
    if (isLogin) {
      res.end('登录成功，欢迎回蓝~')
    } else {
      res.end('账号名或密码错误~')
    }
  })
})


// 案例二：用户注册请求处理
app.post('/register', (req, res, next) => {
  let isRegister = false

  req.on('data', data => {
    // 获取请求中的 json 数据。
    const dataString = data.toString()
    const dataInfo = JSON.parse(dataString)

    // 查询数据库，用户是否已经注册
    isRegister = false
  })

  req.on('end', () => {
    if (isRegister) {
      res.end('注册成功，开始您的路途~')
    } else {
      res.end('您输入的用户名已被注册~')
    }
  })
})

app.listen(9000, () => [
  console.log('express 服务器启动成功~')
])
