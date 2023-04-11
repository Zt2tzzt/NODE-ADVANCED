const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 获取参数: body 参数
  req.setEncoding('utf-8')

  // request 对象本质是上一个 readable 可读流
  let isLogin = false
  req.on('data', dataString => {
    const loginInfo = JSON.parse(dataString)
    if (loginInfo.name === 'zzt' && loginInfo.password === '123') {
      isLogin = true
    } else {
      isLogin = false
    }
  })

  req.on('end', () => {
    if (isLogin) {
      res.end('登录成功, 欢迎回来~')
    } else {
      res.end('账号或者密码错误, 请检测登录信息~')
    }
  })
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
