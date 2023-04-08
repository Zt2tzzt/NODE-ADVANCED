const fs = require('fs')

/**
 * 默认读取文件，会以二进制显示，而打印出来又会转成十六进制。
 */
const res1 = fs.readFileSync('./aaa.txt')
console.log('res1:', res1)
// res1: <Buffer 48 65 6c 6c 6f 20 46 72 6f 67 20 e4 bd a0 e5 a5 bd e5 95 8a ef bc 8c e6 9d 8e e9 93 b6 e6 b2 b3>

/**
 * 读取文件时，传入编码方式，如 'utf8'，告诉 Node 读取文件时，应该如何解码。
 */
const res2 = fs.readFileSync('./aaa.txt', {
  encoding: 'utf8'
})
console.log('res2:', res2)
// res1: Hello Frog 你好啊，李银河

/**
 * 异步处理，回调方式
 */
fs.readFile(
  './aaa.txt',
  {
    encoding: 'utf8'
  },
  (err, data) => {
    if (err) {
      console.log('读取文件出错，err:', err)
      return
    }

    console.log('res3:', data)
  }
)
console.log('res3 的后续代码执行~')
//res3 的后续代码执行~
//res3: Hello Frog 你好啊，李银河

/**
 * 异步处理，Promise 方式
 */
fs.promises
  .readFile('./aaa.txt', {
    encoding: 'utf8'
  })
  .then(res => {
    console.log('res4:', res)
  })
  .catch(err => {
    console.log('err:', err)
  })
