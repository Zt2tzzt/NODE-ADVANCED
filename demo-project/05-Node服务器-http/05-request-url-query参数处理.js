const http = require('http')
const url = require('url')
const qs = require('querystring')

// 1.创建server服务器
const server = http.createServer((req, res) => {

  // 解析 url /home/list?offset=100&size=20
  
  // 1.取到 query 字符串。
  const urlString = req.url
  const urlInfo = url.parse(urlString)
  const queryString = urlInfo.query

  // 2.解析 query string: offset=100&size=20

	// 方式一：
  /* const queryInfo = qs.parse(queryString)
  console.log(queryInfo.offset, queryInfo.size) */

	// 方式二（推荐）：
	const queryInfo = new URLSearchParams(queryString)
  console.log(queryInfo.get('offset'), queryInfo.get('size'))
	// 100 20
	console.log(Object.fromEntries(queryInfo))
	// { offset: '100', size: '20' }

  res.end('hello world aaaa bbb')
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})