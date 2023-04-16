const express = require('express')

const app = express()

app.use(express.json())

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(-1001)
  } else if (username !== 'zzt' || password !== '123') {
    next(-1002)
  } else {
    res.json({
      code: 0,
      msg: '登录成功，欢饮回来~',
      token: 'jksd432KE9routI309df792'
    })
  }
})

// 错误处理的中间件
app.use((errCode, req, res, next) => {
  let msg = '未知的错误信息'

  switch (errCode) {
    case -1001:
      msg = '没有输入用户名或密码~'
      break;
    case -1002:
      msg = '用户名或密码错误~'
      break
  }

  res.json({ code: errCode, msg})
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})