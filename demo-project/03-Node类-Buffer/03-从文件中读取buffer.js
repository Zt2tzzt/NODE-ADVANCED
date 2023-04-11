const fs = require('fs')

fs.readFile('./aaa.txt', { encoding: 'utf8' }, (err, data) => {
	console.log('data:', data)
	// 你好啊，李银河！
})

fs.readFile('./aaa.txt', (err, data) => {
	console.log('data.toString():', data.toString())
	// 你好啊，李银河！
})

// 手动干预文件的读取
fs.readFile('./aaa.txt', (err, data) => {
	data[0] = 0x6d
	console.log('data.toString():', data.toString())
	// m��好啊，李银河！
})

// 读取文件
fs.readFile('./kobe02.png', (err, data) => {
	console.log('pic data:', data)
	// <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 05 03 04 04 04 03 05 04 04 04 05 05 05 06 07 0c 08 07 07 07 07 0f 0b 0b 09 ... 36217 more bytes>
})
