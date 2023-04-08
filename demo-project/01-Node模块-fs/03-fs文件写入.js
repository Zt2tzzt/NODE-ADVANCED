const fs = require('fs')

const content = 'Hello Frog, Mu name is zzt'

fs.writeFile(
  './ccc.txt',
  content,
  {
    encoding: 'utf8',
    flag: 'a'
  },
  err => {
    if (err) {
      console.log('文件写入错误, err:', err)
    } else {
      console.log('文件写入成功')
    }
  }
)
