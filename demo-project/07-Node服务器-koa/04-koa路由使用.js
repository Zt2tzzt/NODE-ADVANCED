const Koa = require('koa')
const KoaRouter = require('@koa/router')
const userRouter = require('./router/user.router')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件 path/method
userRouter.get('/', (ctx, next) => {
  ctx.body = 'user list data~'
})
// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
