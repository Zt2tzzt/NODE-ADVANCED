const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  if (ctx.path === '/users') {

    if (ctx.method === 'GET') {
      ctx.body = 'user data list~'
    } else if (ctx.method === 'POST') {
      ctx.body = 'create user success~'
    }

  } else if (ctx.path === '/home') {
    ctx.body = 'home data list~'
  } else if (ctx.path === '/login') {
    ctx.body = 'login success~'
  }
})

app.listen(9000, () => {
  console.log('Koa 服务器启动成功~')
})
