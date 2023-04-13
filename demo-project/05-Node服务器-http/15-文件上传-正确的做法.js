const http = require('http')
const fs = require('fs')

// 创建 server 服务器
const server = http.createServer((req, res) => {
	req.setEncoding('binary')

	const boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '')
	console.log('boundary:', boundary)
	// --------------------------718407961199339605325918

	// 文件上传进度
	const fileSize = req.headers['content-length']
	console.log('fileSize:', fileSize)
	let countSize = 0

	let formData = ''
	req.on('data', data => {
		formData += data

		// 文件上传进度
		countSize += data.length
		res.write(`文件上传进度：${Math.round(countSize / fileSize * 100)}%\n`)
	})

	req.on('end', () => {
		console.log('end formData:', formData)

		// 1.截取从 image/jpeg 位置开始，后面所有的数据
		const imgType = 'image/jpeg'
		const imgTypePosition = formData.indexOf(imgType) + imgType.length
		let imgData = formData.substring(imgTypePosition)

		// 2.imgData 开始位置会有两个空格
		imgData = imgData.replace(/^\s\s*/, '')

		// 3.替换最后的 boundary
		imgData = imgData.substring(0, imgData.indexOf(`--${boundary}--`))

		// 4.将 imageData 的数据存储到文件中
		fs.writeFile('./bar.png', imgData, 'binary', () => {
			console.log('文件存储成功')
			res.end('文件上传成功')
		})

	})
})

server.listen(8000, () => {
	console.log('服务器看起成功了~')
})

