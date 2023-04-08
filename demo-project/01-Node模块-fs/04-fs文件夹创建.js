const fs = require('fs')

fs.mkdir('./zzt', err => {
  console.log('创建文件夹出错，err:', err)
})
