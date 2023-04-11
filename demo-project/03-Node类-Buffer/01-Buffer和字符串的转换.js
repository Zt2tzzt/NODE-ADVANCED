const fs = require('fs')

/** 创建 Buffer 的两种方式 */

// 方式一，不推荐，弃用的方式
const buf1 = new Buffer('zzt')
console.log('buf1:', buf1)
// buf1: <Buffer 7a 7a 74>

// 方式二
const buf2 = Buffer.from('zzt')
console.log('buf2:', buf2)
// buf1: <Buffer 7a 7a 74>

// 创建 buffer，字符串中有中文
const buf3 = Buffer.from('你好啊，haha')
console.log('buf3:', buf3)
// buf3: <Buffer e4 bd a0 e5 a5 bd e5 95 8a ef bc 8c 68 61 68 61>
console.log('buf3.toString():', buf3.toString())
// 你好啊，haha

// 创建 buffer，手动指定编码
const buf4 = Buffer.from('你好啊', 'utf16le')
console.log('buf4:', buf4)
// 解码操作
console.log(buf4.toString())
// `O}YJU
console.log(buf4.toString('utf16le'))
// 你好啊


