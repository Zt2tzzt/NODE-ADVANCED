const fs = require('fs')

// 一次性写入
/* fs.writeFile('./bbb.txt', 'hello frog', {
	encoding: 'utf8',
	flag: 'a+'
}, err => {
	if (err) {
		console.log('写入文件出错了~')
	} else {
		console.log('写入文件完成了~')
	}
}) */

// 2.创建一个写入流
const writeStream = fs.createWriteStream('./ccc.txt', {
	flags: 'r+',
	start: 5
})

writeStream.write('zzt')
writeStream.write('aaa')
writeStream.write('bbb', err => {
	if(err) {
		console.log('bbb 写入出错了~')
	} else {
		console.log('bbb 写入完成~')
	}
})

/**
 * 写入完成后，需要手动关闭文件，有两种方式；
 * 方式一：close
 * 方式二：end
 */ 
// writeStream.close()

writeStream.end('哈哈哈') // 做了两件事：将最后的内容，写入到文件；关闭文件。


// 一些事件监听
writeStream.on('open', fd => {
	console.log('文件被打开了~，fd:', fd)
})

writeStream.on('finish', () => {
	console.log('写入完成了~')
})

writeStream.on('close', () => {
	console.log('文件被关闭了~')
})