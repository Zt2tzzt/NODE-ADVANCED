const Koa = require('koa')
const KoaRouter = require('@koa/router')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.get('/', (ctx, next) => {

  const isAuth = false

  if (isAuth) {
    ctx.body = 'user list data~'
  } else {
    ctx.app.emit('error', -1003, ctx)
  }
})

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error', (code, ctx) => {
  const errCode = code
  let msg = ''
  switch (errCode) {
    case -1001:
      msg = '帐号或密码错误~'
      break;
    case -1002:
      msg = '请求参数不正确~'
      break;
    case -1003:
      msg = '未授权的请求，请检查token是否正确~'
    default:
      break;
  }

  ctx.body = {
    code: errCode,
    msg
  }
})


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
