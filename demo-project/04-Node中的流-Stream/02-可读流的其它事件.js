const fs = require('fs')

const readStream = fs.createReadStream('./aaa.txt', {
	start: 8,
	end: 18,
	highWaterMark: 3
})

readStream.on('data', data => {
	console.log('data.toString():', data.toString())
})

// 补充其它的事件 监听
readStream.on('open', fd => {
	console.log('通过流，将文件打开了~， fd:', fd)
})

readStream.on('end', () => {
	console.log('已读取到 end 位置~')
})

readStream.on('close', () => {
	console.log('文件读取结束，被关闭~')
})