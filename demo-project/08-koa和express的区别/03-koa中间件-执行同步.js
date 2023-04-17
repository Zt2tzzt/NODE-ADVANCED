const Koa = require('koa')

// 创建app对象
const app = new Koa()

// 注册中间件
app.use((ctx, next) => {
  console.log('koa middleware01')
  ctx.msg = 'aaa'
  next()

  // 返回结果
  ctx.body = ctx.msg
})

app.use((ctx, next) => {
  console.log('koa middleware02')
  ctx.msg += 'bbb'
  next()
})

app.use((ctx, next) => {
  console.log('koa middleware03')
  ctx.msg += 'ccc'
})


// 启动服务器
app.listen(9000, () => {
  console.log('koa服务器启动成功~')
})

// 客户端返回的结果："aaabbbccc"
