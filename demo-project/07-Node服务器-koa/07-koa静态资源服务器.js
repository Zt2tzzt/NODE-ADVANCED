const Koa = require('koa')
const static = require('koa-static')

// 创建 Koa 服务器
const app = new Koa()

app.use(static('./uploads'))
app.use(static('./build'))

// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
