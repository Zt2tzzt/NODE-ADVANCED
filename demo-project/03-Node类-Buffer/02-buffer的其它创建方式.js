const fs = require('fs')

// 1.创建一个 buffer，指定内存空间为 8 个字节
const buf1 = Buffer.alloc(8)
console.log('buf1:', buf1)
// buf1: <Buffer 00 00 00 00 00 00 00 00>

// 2.访问 buffer 中的字节
console.log('buf1[0]:', buf1[0]) // 0
console.log('buf1[1]:', buf1[1]) // 0

// 3.手动操作 buffer 中的字节
buf1[0] = 100
buf1[1] = 0x66
console.log('buf1:', buf1)
// buf1: <Buffer 64 66 00 00 00 00 00 00>
console.log('buf1.toString():', buf1.toString())
// df

buf1[2] = 'm'.charCodeAt()
console.log('buf1:', buf1)
// <Buffer 64 66 6d 00 00 00 00 00>