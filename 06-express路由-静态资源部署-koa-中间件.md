# 一、Express 路由

如果将 express 服务器中，所有的中间件，都在 app 中直接注册，那么代码会变得越来越复杂：

06-Node 服务器-express\17-express-路由.js

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

然而，一个完整的 Web 服务器，包含非常多的处理逻辑；

其中，有些处理逻辑，其实是一个整体，应该将它们放在一起：

- 比如，对 users 相关的处理，其中包括：
  - 获取用户列表；
  - 获取某一个用户信息；
  - 创建一个新的用户；
  - 删除一个用户；
  - 更新一个用户；
  - ...

这个时候，一般使用 `express.Router` 来创建一个路由处理程序：

- 一个 `router` 实例，拥有完整的中间件和路由系统；可以做 app 一样的操作。
- 因此，它也被称为**迷你应用程序（mini-app）**；

重构上面的代码，使用路由注册路由中间件：

06-Node 服务器-express\17-express-路由.js

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

06-Node 服务器-express\router\userRouter.js

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

06-Node 服务器-express\17-express-路由.js

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

Node 就可以作为静态资源服务器；

- 可以写接口，对客户端的请求，进行处理，读取静态资源，并返回给客户端；

- 也可以使用 express 提供的静态资源中间件：即 `express.static('[静态资源目录]')` 方法，返回的中间件。

:egg: 案例理解：

案例1：访问服务器中的图片；

案例2：将打包好的项目，使用静态资源进行部署：

- 部署后，直接访问“[主机名+端口号]”，默认会加载 `index.html`；没找到就会去其它静态资源的目录下找。

06-Node 服务器-express\18-express-静态资源服务器.js

```js
const express = require('express')

const app = express()

app.use(express.static('./uploads')) // 可使用 localhost:9000/1668309647120_kobe02.png 直接访问 ./upload 目录下的名为 1668309647120_kobe02.png 的图片资源。
app.use(express.static('./build')) // 可使用 localhost:9000 直接在 ./build 目录下访问项目的静态资源，默认会找 index.html

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

# 三、Express 错误处理

服务器开发，需要对请求进行错误处理，并将请求中的错误，返回给客户端：

比如一个用户登录接口，可能存在如下的错误：

- 用户名或密码错误；
- 用户名或密码没传；
- 没有传入 token；
- ...

在处理错误时，返回错误码通常有两种方式：

方式一：设置 http 请求的响应状态码：并返回错误信息，比如：

- `res.status（400）`
- `res.json（{ msg: 'err', data: 'xxx' }`

方式二：返回信息，其中包括自定义的错误代码（下面案例采用），比如：

- `res.json({ code: -10001, msg: 'xxx', data: ... })`

在处理错误时，为了使处理过程变得优雅，简洁；通常在一个中间件中，进行错误处理。

- 使用 `next([错误码])` 进入下一个匹配到的中间件，并传递错误码信息，进行错误处理。

06-Node 服务器-express\19-express-错误处理.js

```js
const express = require('express')

const app = express()

app.use(express.json())

app.post('/login', (req, res, next) => {
  const { username, password } = req.body

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
      break
    case -1002:
      msg = '用户名或密码错误~'
      break
  }

  res.json({ code: errCode, msg })
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})
```

# 四、Koa 是什么？

除了 express，另外一个非常流行的，基于 Node 的 Web 服务器框架就是 Koa。

Koa 官方的定义："generation web framework for node.js"；即 “node.js 的下一代 web 框架”；

koa 和 express 都出自 TJ 之手，是由同一个团队开发的 Web 服务器框架：

目前 TJ 的主要精力，在于维护 Koa；至于 express 已经交给团队维护了；

Koa 旨在为 Web 应用程序和 API 提供更轻量、更丰富，更强大的能力；

相对于 express 具有更强的**异步处理能力**（后续会对比）；

Koa 的核心代码只有 1600+ 行，是一个更加轻量级的框架；

Koa 开发，根据需要，安装和使用中间件；

> 【注意】：在 Koa 中，任何没有匹配到的请求，默认都会返回”Not Found“

# 五、Koa 基本使用

使用 koa 框架，基于 Node 开发 Web 服务器，过程与 express 类似。

*koa* 也是通过注册中间件，来完成请求处理的；

_koa_ 注册的中间件（回调函数），提供了两个参数：

`ctx`：上下文（Context）对象；

- _koa_ 并没有像 _express_ 一样，将 `req` 和 `res` 分开，而是将它们作为 `ctx` 的属性；
- `ctx` 代表一次请求的上下文对象；
- `ctx.request`：是 Koa 封装的请求对象；`ctx.req`：是 Node 的 _http_ 模块封装的请求对象。
  - 大部分 `ctx.request` 对象拥有的属性，`ctx` 中也有。
- `ctx.response`：获取 koa 封装的响应对象；`ctx.res`：获取 Node 的 _http_ 模块封装的响应对象。

`next`：本质上是一个异步方法（dispatch），使用时，类似于 express 的 `next`，但处理异步代码时，有所不同。

Koa 返回响应数据结果时，可用 `ctx.response.end`, `ctx.res.end`, `ctx.body` 属性赋值.

koa 创建服务器，开启服务器，使用中间件；

koa 中间件无法使用 `get`、`post` 这样的方法，进行注册；只能使用 `use` 方法。

安装 Koa：

```shell
npm install koa
```

基本使用：

07-Node 服务器-Loa\01-koa 基本使用.js

```js
const koa = require('koa')

// 创建 app 对象
const app = new koa()

// 注册中间件，koa 的中间件，仅有两个参数：ctx、next
app.use((ctx, next) => {
  console.log('匹配到 koa 的中间件~')

  // 返回响应结果
  ctx.body = '哈哈'
})

app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
```

ctx 参数解析：

07-Node 服务器-Loa\02-koa 中间件-ctx 参数解析.js

```js
const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // 1.请求对象
  console.log('ctx.request:', ctx.request) // 请求对象: Koa 封装的请求对象。
  console.log('ctx.req:', ctx.req) // 请求对象: Node 封装的请求对象。

  // 2.响应结果
  console.log('ctx.response:', ctx.response) // 响应对象: Koa 封装的响应对象。
  console.log('ctx.res:', ctx.res) // 响应对象: Node 封装的响应对象。

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
```

# 六、Koa 中间件

koa 注册中间件，只能通过 `qpp.use` 方法：且只能传入回调函数，不能使用 `get`，`post` 这样的方法，或传入路径。

Koa 没有提供 methods 的方式，来注册中间件；也没有提供 path 的路径匹配；

那么如何将 path 和 method 分离呢？

方式一：在 `ctx` 中，取出请求方法和路径，自己来判断；（实际开发中，不会这么做，太繁琐）

07-Node 服务器-Loa\03-koa 区分方法和路径.js

```js
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
```

方式二：使用第三方路由中间件；

见下方案例。

# 七、Koa 路由

koa 官方并没有提供路由的功能，需要下载第三方库：

有两种选择：

- [koa-router](https://github.com/ZijianHe/koa-router)
- [router](https://github.com/koajs/router)（项目中使用）

需要手动安装。

```shell
npm install @koa/router
```

创建路由，封装一个 `user.router.js` 的文件：

在路由中，注册中间件。

07-Node 服务器-Loa\router\user.router.js

```js
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
userRouter.delete('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `delete user ${id} data~`
})
userRouter.patch('/:id', (ctx, next) => {
  const id = ctx.params.id
  ctx.body = `patch user ${id} data~`
})

module.exports = userRouter
```

让路由生效。

使用 `app.use(router.routes())` 注册路由。

在 Koa 中，任何没有匹配到的请求，默认都会返回“Not Found”，处理这种情况。

使用 `app.use(router.allowedMethods()` 注册为中间件。

`allowedMethods` 用于判断请求的 method 或 path，服务器是否做了处理：

- 如果发送的请求，未匹配到 method，自动返回：“Method Not Allowed”，状态码：405；
- 如果发送的请求，未匹配到 path，自动返回：“Not Implemented”，状态码：404；

> 【补充】：在一个项目中可以既使用 yarn，又使用 npm，但建议统一用一种包管理工具。

07-Node 服务器-Loa\04-koa 路由使用.js

```js
const Koa = require('koa')
const userRouter = require('./router/user.router')

const app = new Koa()

// 3.注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
```

> 【补充】：postman 中 `OPTIONS` 请求方式，返回接口路径封装的所有请求方法。

> 为 Koa 创建服务器并注册路由的代码逻辑，封装一个代码片段。
>
> C:\Users\00015167\AppData\Roaming\Code\User\snippets\javascript.json
>
> ```json
> {
>   "koa server": {
>     "prefix": "koa-server",
>     "body": [
>       "const Koa = require('koa')",
>       "const KoaRouter = require('@koa/router')",
>       "",
>       "// 创建 Koa 服务器",
>       "const app = new Koa()",
>       "",
>       "// 创建路由对象",
>       "const ${2:router} = new KoaRouter({ prefix: '/${1:users}' })",
>       "",
>       "// 在路由中，注册中间件",
>       "${2:router}.get('/', (ctx, next) => {",
>       "  ctx.body = 'user list data~'",
>       "})",
>       "",
>       "// 注册路由",
>       "app.use(${2:router}.routes())",
>       "app.use(${2:router}.allowedMethods())",
>       "",
>       "",
>       "// 开启 Koa 服务器",
>       "app.listen(9000, () => {",
>       "  console.log('koa 服务器启动成功~')",
>       "})",
>       ""
>     ],
>     "description": "koa server"
>   }
> }
> ```

# 八、Koa 请求参数解析

## 1.GET 请求

07-Node 服务器-Loa\05-koa 请求参数.js

```js
const Koa = require('koa')
const KoaRouter = require('@koa/router')

// 创建 Koa 服务器
const app = new Koa()

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

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
```

## 2.POST 请求

body 请求体中的 json、x-www-form-urlencoded 数据解析。

安装一个库 [koa-bodyparser](https://github.com/koajs/bodyparser)

```shell
npm i koa-bodyparser
```

再使用 `ctx.request.body` 获取。

```json
const Koa = require('koa')
const KoaRouter = require('@koa/router')
const bodyParser = require('koa-bodyparser')

// 创建 Koa 服务器
const app = new Koa()

app.use(bodyParser())

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

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

// 注册路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
```

> 【注意】：
>
> - 不要从 `ctx.body` 中获取数据，这是用来返回结果的；
> - 早期很多库，都将解析后的信息放在 `ctx.req.body` 中，现在一般放在 `ctx.request.body` 中。

body 请求体中的 form-data 数据解析。

安装一个库，[multer](https://github.com/koajs/multer)、

```shell
npm install --save @koa/multer multer
```

07-Node 服务器-Loa\05-koa 请求参数.js

```js
const Koa = require('koa')
const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')

// 创建 Koa 服务器
const app = new Koa()

const formParser = multer()

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// POST 请求，formData 解析
userRouter.post('/formdata', formParser.any(), (ctx, next) => {
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
```

# 九、Koa 文件上传

安装一个库 [multer](https://github.com/koajs/multer)

```shell
npm install --save @koa/multer multer
```

在 `ctx.request.file` 中，获取单文件上传信息。

在 `ctx.request.files` 中，获取多文件上传信息。

```js
const Koa = require('koa')
const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')

// 创建 Koa 服务器
const app = new Koa()

/* const upload = multer({
  dest: './uploads'
}) */

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads')
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

// 创建路由对象
const uploadRouter = new KoaRouter({ prefix: '/upload' })

// 在路由中，注册中间件
uploadRouter.post('/avatar', upload.single('avatar'), (ctx, next) => {
  console.log('ctx.request.file:', ctx.request.file)
  ctx.body = '文件上传成功~~'
})

uploadRouter.post('/photos', upload.array('photos'), (ctx, next) => {
  console.log('ctx.request.files:', ctx.request.files)
  ctx.body = '文件上传成功~'
})

// 注册路由
app.use(uploadRouter.routes())
app.use(uploadRouter.allowedMethods())

// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})
```

> 【注意】：文件保存的目录，要存在，否则会返回“Not Found”。

