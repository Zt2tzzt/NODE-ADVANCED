const fs = require('fs')

// 对文件夹重命名
fs.rename('./zzt', './kobe', err => {
  if (err) {
    console.log('重命名文件夹出错，err:', err)
    return
  }

  console.log('重命名文件夹完成')
})

// 对文件重命名
fs.rename('./ccc.txt', './ddd.txt', err => {
  if (err) {
    console.log('重命名文件夹出错，err:', err)
    return
  }
  console.log('重命名文件夹完成')
})
