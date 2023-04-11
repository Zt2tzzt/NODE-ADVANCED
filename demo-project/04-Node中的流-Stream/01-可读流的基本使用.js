const fs = require('fs')

// 1.一次性读取
fs.readFile('./aaa.txt', (err, data) => {
	console.log('data:', data)
	// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 2c 20 4d 79 20 6e 61 6d 65 20 69 73 20 7a 7a 74>
})

// 2.通过流读取文件
const readStream = fs.createReadStream('./aaa.txt', {
	start: 8,
	end: 18,
	highWaterMark: 3
})

readStream.on('data', data => {
	console.log('data.toString():', data.toString())
	readStream.pause()

	setTimeout(() => {
		readStream.resume()
	}, 2000);
})
// data.toString(): rld
// data.toString(): , M
// data.toString(): y n
// data.toString(): am


