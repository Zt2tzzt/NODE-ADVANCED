const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {

  // 设置header信息: 数据的类型以及数据的编码格式
  // 1.单独设置某一个header
  // res.setHeader('Content-Type', 'text/plain;charset=utf8;')

  // 2.和http status code一起设置
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf8;'
  })

  const list = [
    { name: "zzt", age: 18 },
    { name: "kobe", age: 30 },
  ]
  res.end(JSON.stringify(list))
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
