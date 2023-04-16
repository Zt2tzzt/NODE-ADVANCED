const koa = require('koa')

// 创建 app 对象
const app = new koa()

// 注册中间件，koa 的中间件，仅有两个参数：ctx / next
app.use((ctx, next) => {
  console.log('匹配到 koa 的中间件~')

  // 返回响应结果
  ctx.body = '哈哈'
})

app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
