const http = require('http')

// 1.创建第一个服务器
const server1 = http.createServer((req, res) => {
	res.end('2000 端口的服务器返回的结果~')
})
server1.listen(2000, () => {
  console.log('2000端口对应的服务器启动成功~')
})

// 2.创建第二个服务器
const server2 = http.createServer((req, res) => {
  res.end("3000端口服务器返回的结果~")
})
server2.listen(3000, () => {
  console.log('3000端口对应的服务器启动成功~')
})

