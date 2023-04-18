const Koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const multer = require('@koa/multer')

// 创建 Koa 服务器
const app = new Koa()

app.use(bodyParser())

const formParser = multer()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// GET 请求，params 参数获取
userRouter.get('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `user ${id} data~`
})

// GET 请求，query 参数获取
userRouter.get('/', (ctx, next) => {
  console.log('ctx.query:', ctx.query)
  // { offset: '20', limit: '10' }
  ctx.body = `user list data ${JSON.stringify(ctx.query)} ~`
})

// POST 请求，json 格式解析
userRouter.post('/json', (ctx, next) => {
  // 不要从 ctx.body 中获取数据，这是用来返回结果的
  console.log('ctx.request.body:', ctx.request.body)
  // { name: 'zzt', age: 18 }
  console.log('ctx.req.body:', ctx.req.body)
  // undefiend

  ctx.body = 'accept user josn data~'
})

// POST 请求，urlencoded 格式解析
userRouter.post('/urlencoded', (ctx, next) => {
  console.log('ctx.request.body:', ctx.request.body)
  // { name: 'zzt', age: 18 }
  console.log('ctx.req.body:', ctx.req.body)
  // undefined

  ctx.body = 'accept user urlencoded data~'
})

// POST 请求，formData 解析
userRouter.post('/formdata', formParser.any(),  (ctx, next) => {
  console.log('ctx.request.body:', ctx.request.body)
  // { name: 'zzt', age: '18' }
  ctx.body = 'accept user formdata data~'
})

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
