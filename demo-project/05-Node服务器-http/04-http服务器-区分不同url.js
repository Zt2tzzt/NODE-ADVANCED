const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
	
  const url = req.url

  if (url === '/login') {
    res.end('登录成功~')
  } else if (url === '/products') {
    res.end('商品列表~')
  } else if (url === '/lyric') {
    res.end('天空好想下雨, 我好想住你隔壁!')
  }
})


// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
