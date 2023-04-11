const http = require('http')

// 1.创建 server 服务器
const server = http.createServer((req, res) => {
  // request 对象中包含以下常用的信息：
  // 1.url 信息
  // 2.method 信息(请求方式)
  // 3.headers 信息(请求信息)

  console.log(req.url)
	// /

  console.log(req.method)
	// GET

  console.log(req.headers)
	// {
	// 	'user-agent': 'PostmanRuntime/7.31.1',
	// 	accept: '*/*',
	// 	'postman-token': '6b4b4127-1eff-43db-8b52-f39aec4278d9',
	// 	host: 'localhost: 8000',
	// 	'accept-encoding': 'gzip, deflate, br',
	// 	connection: 'keep-alive'
	// }

  res.end('hello world aaaa')
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
