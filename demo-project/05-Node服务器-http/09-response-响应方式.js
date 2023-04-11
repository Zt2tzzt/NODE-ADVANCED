const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // res: response 对象 => 本质是 Writable 可写流

  // 1.响应数据方式一: write
  res.write("Hello World")
  res.write("哈哈哈哈")

  // // 2.响应数据方式二: end
  res.end("本次写出已经结束")
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
