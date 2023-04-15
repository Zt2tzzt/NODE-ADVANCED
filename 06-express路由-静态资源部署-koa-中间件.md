Express 的路由

router 中可以做 app 中一样的操作。

注册路由。

将路由放在单独的文件中进行管理。

---

静态资源服务器

访问服务器中的图片，可以写接口，进行读取

也可以使用 express 为我们提供的静态资源中间件。

可以将打包好的项目，使用静态资源进行部署，

- 直接访问主机名+端口号，默认会加载 index.htm;，没找到就回去静态资源的目录下找。

---

服务端错误处理

出现的错误有：

- 用户名密码错误；
- 用户名密码必传；
- 没有传入 token
- ...

处理方式：

方式一：设置状态码：

- res.status
- res.json

方式二：返回信息，其中包括自定义的错误代码。

---

模拟一次登录请求校验。

---

重构代码，将错误处理的逻辑，放入到中间件中。

在中间件中，传入四个参数，第一个参数是 err

调用 next(err) 进入该中间件。

---

Koa 是什么？

在 Koa 中，任何没有匹配到的请求，都会返回 Not Found

---

Koa 基本使用

安装 Koa

npm install koa

创建服务器，开启服务器，使用中间件

- 中间件中传入的回调函数，有 ctx 参数。其中有 res, response 属性。
- 返回数据可用 res.end, response.end, body 属性复制。

koa 中间件无法使用 get、post 进行注册。

ctx 参数解析

ctx.request Koa 封装的请求对象。

- 大部分 request 对象拥有的属性，ctx 中也有。

ctx.req Node http 模块的请求对象。

next 参数，与 express 中间件中 next 参数类似。

---

Koa 中间件

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