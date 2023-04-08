const fs = require('fs')

// 打开文件
fs.open('./bbb.txt', (err, fd) => {
  if (err) {
    console.log('打开文件出错，err:', err)
    return
  }

  console.log('fd:', fd)

  // 读取文件信息
  fs.fstat(fd, (err, status) => {
    if (err) {
      console.log('读取文件信息出错，err:', err)
      return
    }

    console.log('fd status:', status)

    // 手动关闭
    fs.close()
  })
})
