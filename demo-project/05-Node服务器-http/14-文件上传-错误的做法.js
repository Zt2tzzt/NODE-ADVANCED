const http = require('http')
const fs = require('fs')

// 创建服务器
const server = http.createServer((req, res) => {
  // 创建一个可写流。
  const writeStream = fs.createWriteStream('./foo.jpg', {
    flags: 'a+'
  })

	const fileSize = req.headers['content-length']
	console.log('fileSize:', fileSize)
	let countSize = 0

  // 客户端传过来的是表单数据，在 body 请求体中
  req.on('data', data => {
    console.log('data:', data)
    /* data: <Buffer 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 2d 36 38 34 30 35 36 35 36 32 38 32 30 39 37 31 35 30 34 34 39 34 35 ... 65133 more bytes>
    data: <Buffer 64 a7 8d a0 a4 94 15 c0 1b 41 57 02 0c 54 7e 92 b5 69 6e 3b 95 b8 09 6e d6 c1 a5 3e f2 97 cc 77 2a de 01 05 43 ee 6d 0b 20 f1 e1 e7 58 45 61 8e 0d 12 ... 65486 more bytes>
    data: <Buffer fc e2 50 73 0d aa df 94 85 e9 8a 5e 98 ae 43 a0 a7 1b f1 f8 7d 69 3a ad bd 3e 7f 23 fd ab 84 38 23 78 22 1a a6 29 14 7d e1 f1 fc 8d 3d 50 a8 65 22 99 ... 65486 more bytes>
    data: <Buffer 64 03 c9 1c c0 e6 ad 52 d4 97 02 4e c4 a9 c5 a8 a6 24 c1 51 52 47 59 10 20 47 1d 2a 71 87 08 71 3b 5e 65 82 cb 4b 59 2e b9 b0 a9 29 4a a5 09 9f bc 16 ... 35064 more bytes> */
		countSize += data.length
		console.log('countSize:', countSize)
		res.write(`文件上传进度：${Math.round((countSize / fileSize) * 100)}%\n`)
		
    writeStream.write(data)
  })

  req.on('end', () => {
    writeStream.close()
    res.end('文件上传成功~')
  })
})

// 开启服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
