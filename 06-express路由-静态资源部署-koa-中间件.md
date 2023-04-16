# 一、Express 路由

如果将 express 服务器中，所有的代码逻辑，都写在 app 中，那么 app 会变得越来越复杂：

然而，一个完整的 Web 服务器，包含非常多的处理逻辑；

其中，有些处理逻辑，其实是一个整体，应该将它们放在一起：

- 比如，对 users 相关的处理，其中包括：
  - 获取用户列表；
  - 获取某一个用户信息；
  - 创建一个新的用户；
  - 删除一个用户；
  - 更新一个用户；
  - ...

06-Node服务器-express\17-express-路由.js

```js
const express = require('express')

const app = express()

// 用户相关的接口，使用 app 注册中间件
app.get('/users', (req, res, next) => {
  res.end('返回了用户列表~')
})
app.get('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('返回了用户信息~')
})
app.post('/users', (req, res, next) => {
  res.end('新增了用户列表~')
})
app.delete('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('删除了用户~')
})
app.patch('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('修改了用户~')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

这个时候，一般使用 `express.Router` 来创建一个路由处理程序：
- 一个 `router` 实例，拥有完整的中间件和路由系统；可以做 app 中一样的操作。
- 因此，它也被称为 迷你应用程序（mini-app）；

重构上面的代码，使用路由注册路由中间件：

06-Node服务器-express\17-express-路由.js

```js
const express = require('express')

const app = express()

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
  res.end('返回了用户列表~')
})
userRouter.get('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('返回了用户信息~')
})
userRouter.post('/', (req, res, next) => {
  res.end('新增了用户列表~')
})
userRouter.delete('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('删除了用户~')
})
userRouter.patch('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('修改了用户~')
})

app.use('/users', userRouter)

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

将路由放在单独的文件中进行管理。

06-Node服务器-express\router\userRouter.js

```js
const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
  res.end('返回了用户列表~')
})
userRouter.get('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('返回了用户信息~')
})
userRouter.post('/', (req, res, next) => {
  res.end('新增了用户列表~')
})
userRouter.delete('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('删除了用户~')
})
userRouter.patch('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('修改了用户~')
})

module.exports = userRouter
```

06-Node服务器-express\17-express-路由.js

```js
const express = require('express')
const userRouter = require('./router/userRouter')

const app = express()

app.use('/users', userRouter)

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

# 二、Express 静态资源

部署静态资源，可以选择很多方式：

其中 Node 就可以作为静态资源服务器；

可以写接口，进行读取；

也可以使用 express 为提供的静态资源中间件：

- `express.static('[静态资源目录]')` 方法，返回的中间件。

:egg: 案例理解：

1.访问服务器中的图片，

2.将打包好的项目，使用静态资源进行部署，

- 部署后，直接访问“[主机名+端口号]”，默认会加载 index.htm;，没找到就会去其它静态资源的目录下找。

06-Node服务器-express\18-express-静态资源服务器.js

```js
const express = require('express')

const app = express()

app.use(express.static('./uploads'))  // 可使用 localhost:9000/1668309647120_kobe02.png 直接访问 ./upload 目录下的图片资源。
app.use(express.static('./build')) // 可使用 localhost:9000 直接在 ./build 目录下的浏览器中访问项目的静态资源

app.get('/home', (req, res, next) => {

})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

# 三、Express 错误处理

服务器开发，需要对请求进行错误处理，并将请求中的错误，返回给客户端：

比如一个用户登录接口，会有如下的错误：

- 用户名密码错误；
- 用户名密码必传；
- 没有传入 token
- ...

在处理错误时，返回错误码通常有两种方式：

方式一：设置响应状态码：并返回错误信息

- `res.status`
- `res.json`

方式二：返回信息，其中包括自定义的错误代码。

- `res.json({ code: -10001, msg: 'xxx', data: ... })`

在处理错误时，为了使处理过程变得优雅，简洁。通常在一个中间件中，进行错误处理。

06-Node服务器-express\19-express-错误处理.js

```js
const express = require('express')

const app = express()

app.use(express.json())

app.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(-1001) // 调用 next(errCode) 进入处理错误的中间件，并传递错误代码参数。
  } else if (username !== 'zzt' || password !== '123') {
    next(-1002)
  } else {
    res.json({
      code: 0,
      msg: '登录成功，欢饮回来~',
      token: 'jksd432KE9routI309df792'
    })
  }
})

// 错误处理的中间件
app.use((errCode, req, res, next) => {
  let msg = '未知的错误信息'

  switch (errCode) {
    case -1001:
      msg = '没有输入用户名或密码~'
      break;
    case -1002:
      msg = '用户名或密码错误~'
      break
  }

  res.json({ code: errCode, msg})
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

# 四、Koa 是什么？

除了 express，另外一个非常流行的 Node Web 服务器框架就是 Koa。

Koa 官方的定义：generation web framework for node.js；即 node.js 的下一代 web 框架；

koa 和 express 都出自[那个男人](https://github.com/tj)之手，是由同一个团队开发的新的 Web 框架：

目前那个男人的主要精力，也在维护 Koa；express 已经交给团队维护了；

Koa 旨在为 Web 应用程序和 API 提供更轻量、更丰富，更强大的能力；

相对于 express 具有更强的**异步处理能力**（后续我们再对比）；

Koa 的核心代码只有 1600+ 行，是一个更加轻量级的框架；

根据需要，安装和使用中间件；

> 【注意】：在 Koa 中，任何没有匹配到的请求，默认都会返回 Not Found

# 五、Koa 基本使用

使用 koa 框架，基于 Node 开发 Web 服务器，过程与 express 类似。

koa 也是通过注册中间件来完成请求处理的；

*koa* 注册的中间件（回调函数），提供了两个参数：

`ctx`：上下文（Context）对象；

- *koa* 并没有像 *express* 一样，将 `req` 和 `res` 分开，而是将它们作为ctx的属性；
- `ctx` 代表一次请求的上下文对象；
- `ctx.request`：获取 Node 的 http 模块封装的请求对象；`ctx.req`：获取 Koa 封装的请求对象。
  - 大部分 `cttx.request` 对象拥有的属性，`ctx` 中也有。
- `ctx.response`：获取 Node 的 http 模块封装的响应对象；`ctx.res`：获取 koa 封装的响应对象。

`next`：本质上是一个 dispatch，类似于之前的 next；

- 后续我们学习Koa的源码，来看一下它是一个怎么样的函数；

返回响应数据结果时，可用 `res.end`, `response.end`, `body` 属性复制

使用 koa 创建服务器，开启服务器，使用中间件

koa 中间件无法使用 get、post 进行注册。

next 参数，与 express 中间件中 next 参数类似。

安装 Koa

```shell
npm install koa
```

基本使用：

07-Node服务器-Loa\01-koa基本使用.js

```js
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
```



# 二、Koa 中间件

只能传入回调函数，不能使用方法，或传入路径。

---

在 Koa 中，进行路径匹配和方法匹配。

但实际开发中，不会这么做，太繁琐。

一般会使用路由。

---

Koa 中的路由。

需要手动安装。

有两种选择，都可以：

- [koa-router](https://github.com/ZijianHe/koa-router)
- [router](https://github.com/koajs/router)（项目中使用）

> 【补充】：在一个项目中可以即使用 yarn，又使用 npm，但建议统一用一种包管理工具。

---

创建路由

在路由中，注册中间件。此时hi既可以用 method 匹配，又可以用 path 匹配。

让路由生效。

- app.use(userRouter.routes())

在 Koa 中，任何没有匹配到的请求，都会返回 Not Found，处理这种情况。

调用 userRouter.allowedMethods()

未匹配到的请求方法，返回 Method not Allowances

> 【补充】：postman 中 options 请求方法，返回接口路径封装的所有请求方法。

将路由的代码逻辑，封装到独立的文件中，

---

Koa 中请求参数解析

> 为 Koa 创建服务器， 注册路由的代码逻辑，封装一个代码片段。

get， post 共五种请求方式的参数解析。

post 请求 body 请求体中的 json，urlencoded 数据解析。

- 安装一个库 koa-bodyparser
- 再使用 ctx.request.body 中获取。

post 请求 body 请求体中的 form-data 数据解析。

- 安装一个库，[multer](https://github.com/koajs/multer)、
- npm install --save @koa/multer multer

早期很多库，都将解析后的信息放在 ctx.req.bocy 中，现在一般放在 ctx.request.body 中。

---

Koa 文件上传。

在 ctx.request.file 中，获取文件上传信息。

多文件上传。

ctx.request.files