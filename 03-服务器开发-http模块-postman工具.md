Web 服务器是社么？

Nods 有 http 模块，通常使用基于该模块的框架，如 express、koa，开发服务i其。

---

http 模块

---

创建服务器

一个主机（云主机）中，可以创建多个服务器，每个服务器通常监听不同的端口，提供不同的服务。

nginx 服务器，默认就监听 80 端口。

使用 http 模块，创建服务器，并告知要监听的端口。



一般要监听 (1024，65535] 之间的端口。

- 否则可能会覆盖系统的某些特殊服务端口。
- 通常操作系统使用两个字节，表示端口，即最大端口是 255 * 255 = 65536，即 0 - 65535 端口。

一旦监听端口，Node 线程将阻塞，等待客户端请求。

在 createServer 中，传入回调函数，获取 request，response 对象。

response 本质上是一个可写流。request 本质上是一个可读流。

编写开启服务器的一个完整过程。编写 05.../01...



创建多个服务器，编写 95.../02...

---

监听主机和端口号

---

补充：

创建一个服务器，如果使用浏览器访问，默认会访问两次

- 一次访问访问开启服务的端口。
- 一次访问 favicon.ico 图标。

浏览器没法测试 post 请求。

基于以上两点原因，浏览器测试会有一定的干扰，使用 postman 进行测试。



默认 node 开启一个服务器，如果修改了其中的代码逻辑，需要手动重启，才能生效。

安装一个依赖 nodemon(node monitor) 插件，用于 node 服务器的自动重启。

```shell
npm install nodemon -g

nodemon xxx.js
```

将创建服务器，开启服务器，的代码，创建一个代码片段。快速生成。

---

request 对象。

---

url 处理，

---

method 的处理。

在框架（如 express）中，封装了 method 和 url 结合的处理。

---

url 的解析

使用 node 提供的 url 模块；

1.解析 url

2.解析 query（最好用 URLSearchParmas），编写 07...

---

创建用户接口。

body 参数的解析，编写 08...

reuqest 对象中，没有 body 请求体。

request 对象本质上是一个 readable 可读流。

---

HTTP Request Header

回顾请求携带的数据的类型。

content-type 有哪些类型：

编写 09...

content-length 用于记录文件大小长度，判断是否适合一次性读取。

额外的一些属性的意义。



在服务器中，获取请求携带的 token，在 postmen 中，选择默认的授权方式，token 会被自动放入请求头中；在 req.header.authoritarian 中获取

---

返回响应结果

response 本质上是一个 writeable 可写流。

两种方式做出响应，

- write 方法。
- end 方法。

response 特殊之处，没有 close 方法，只能调用 end 方法结束。

---

返回状态码

两种方式设置状态码

- resstatusCode 指定。
- res.writeHeaded

编写 11...

---

响应头文件

指定返回的数据格式和字符编码。