const fs = require('fs')

// 方式一：一次性读取文件，再一次性写入文件
/* fs.readFile('./foo.txt', (err, data) => {
	if (err) {
		console.log('读取 foo 失败了，err:', err)
	} else {
		console.log('读取 foo 成功了，data:', data)
	}

	fs.writeFile('./foo-copy01.txt', data, err => {
		if (err) {
			console.log('foo-copy01 写入失败了~，err:', err)
		} else {
			console.log('foo-copy01 写入成功了')
		}
	})
}) */


// 方式二：使用可读流、可写流
/* const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo-copy02.txt')

readStream.on('data', data => {
	writeStream.write(data)
})

readStream.on('end', () => {
	writeStream.close()
}) */


// 方式三：在可读流，可写流之间，建立一个 pipe 通道。
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo-copy03.txt')

readStream.pipe(writeStream)

