const KoaRouter = require('@koa/router')

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 2.在路由中，注册中间件 path/method
userRouter.get('/', (ctx, next) => {
  ctx.body = 'user list data~'
})
userRouter.get('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `get user ${id} data~`
})
userRouter.post('/', (ctx, next) => {
  ctx.body = 'create user success~~'
})
/* userRouter.delete('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `delete user ${id} data~`
}) */
userRouter.patch('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `patch user ${id} data~`
})

module.exports = userRouter