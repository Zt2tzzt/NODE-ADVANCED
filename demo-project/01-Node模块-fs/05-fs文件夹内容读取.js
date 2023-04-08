const fs = require('fs')

// 读取直接子级中的内容
/* fs.readdir('./zzt', (err, files) => {
  if (err) {
    console.log('读取文件出错，err:', err)
  }
  console.log('files:', files)
  // files: [ 'aaa', 'bbb', 'nba.txt' ]
}) */

// 判断直接子级中的内容，是文件夹，还是文件。
/* fs.readdir('./zzt', { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log('读取文件出错，err:', err)
  }

	console.log('files:', files)
	// files: [
	// 	Dirent { name: 'aaa', [Symbol(type)]: 2 },
	// 	Dirent { name: 'bbb', [Symbol(type)]: 2 },
	// 	Dirent { name: 'nba.txt', [Symbol(type)]: 1 }
	// ]

  files.forEach(item => {
    if (item.isDirectory()) {
      console.log(item.name, '是一个文件夹')
    } else {
      console.log(item.name, '是一个文件')
    }
  })
}) */

// 递归读取文件夹中所有的文件
const readDirectoryFile = path => {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    files.forEach(item => {
      if (item.isDirectory()) {
        readDirectoryFile(`${path}/${item.name}`)
      } else {
        console.log('获取到文件:', item.name)
      }
    })
  })
}
readDirectoryFile('./zzt')
