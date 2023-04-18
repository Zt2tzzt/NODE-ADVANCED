const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // 1.请求对象
  console.log('ctx.request:', ctx.request) // 请求对象: Koa 封装的请求对象
  console.log('ctx.req:', ctx.req) // 请求对象: Node 封装的请求对象

  // 2.响应结果
  console.log('ctx.response:', ctx.response) // 响应对象: Koa 封装的响应对象
  console.log('ctx.res:', ctx.res) // 响应对象: Node 封装的响应对象

  // 3/其它属性
  console.log('ctx.query:', ctx.query)
  console.log('ctx.params:', ctx.params)
})

app.use((ctx, next) => {
  console.log('second middleware')
})

app.listen(9000, () => {
  console.log('Koa 挥舞起启动成功~')
})
