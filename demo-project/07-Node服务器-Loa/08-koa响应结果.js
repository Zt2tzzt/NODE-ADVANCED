const fs = require('fs')
const Koa = require('koa')
const KoaRouter = require('@koa/router')

// 创建 Koa 服务器
const app = new Koa()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 在路由中，注册中间件
userRouter.get('/', (ctx, next) => {

  // 1.body 类型设置未 string
  // ctx.body = 'user list data~'

  // 2.body 的类型是 buffer
  // ctx.body= Buffer.from('你好啊，李银河~')
  // 浏览器中， 会将返回的结果，作为一个文件下载下来。
  // postman 会将返回的是 buffer / stream 类型，自动使用 utf8 解码。并直接展示

  // 3.body 的类型是 stream
  // const readStream = fs.createReadStream('./uploads/1668331072032_kobe02.png')
  // ctx.type = 'image/jpeg'
  // ctx.body = readStream
  // postman，浏览器中，直接展示图片，相当于访问静态资源。

  // 4.body 的类型是数据 object | array，用的最多。
  ctx.status = 201
  ctx.body = {
    code: 0,
    data: [
      {id: 111, name: 'iphone', price: 999},
      {id: 112, name: 'xiaomi', price: 666}
    ]
  }

  // 5.body 的值是 null
  // ctx.body = null
})


// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
