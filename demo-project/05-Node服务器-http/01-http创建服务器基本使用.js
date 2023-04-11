const http = require('http')

// 创建一个 http 对应的服务器
const server = http.createServer((request, response) => {
	/**
	 * request 对象中，包含本次客户端请求的所有信息：
   * 请求的 url；
   * 请求的 method；
   * 请求的 headers；
   * 请求携带的数据。
	 */
	response.end('Hello World')
})

// 开启服务器，指定监听的端口。
server.listen(8000, () => {
	console.log('服务器看起成功了~')
})

