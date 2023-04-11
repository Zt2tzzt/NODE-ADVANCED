const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  console.log(req.headers)
	// {
	// 	authorization: 'Bearer abc123',
	// 	'content-type': 'application/json',
	// 	'user-agent': 'PostmanRuntime/7.31.1',
	// 	accept: '*/*',
	// 	'postman-token': 'c7c5686d-f2a6-44c8-819f-f06251669114',
	// 	host: 'localhost: 8000',
	// 	'accept-encoding': 'gzip, deflate, br',
	// 	connection: 'keep-alive',
	// 	'content-length': '39'
	// }

  console.log(req.headers['content-type'])
	// application/json

  // 后续会介绍 cookie/session/token 在服务器开发中的处理方式
  const token = req.headers['authorization']
  console.log(token)

  res.end('查看 header 的信息~')
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
