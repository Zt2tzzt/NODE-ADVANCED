# 一、数据的二级制

计算机中所有的内容：文字、数字、图片、音频、视频，最终都会使用二进制来表示。

JavaScript 可以直接去处理，非常直观的数据：

- 比如字符串，前端通常展示给用户的也是这些内容。

事实上，前端的 JavaScript 代码，不能直接处理图片：

- 图片是交给浏览器来处理的；
- JavaScript 或者 HTML 代码，只是负责告诉浏览器一个图片的地址；
- 以便浏览器获取这个图片，最终将这个图片渲染出来；

事实上，对于服务器来说，使用程序处理的本地文件类型，相对较多;

- 比如某一个存储文本的文件，使用 GBK（早期 Windows 常用）进行编码，
  - 那么必须读取该文件的二进制数据，再通过 GKB 编码，转换成对应的文字；
- 比如读取的是一张图片（二进制数据），再通过某些手段，对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜）。
- 比如在 Node 中通过 TCP 建立长连接；
  - TCP 传输的是字节流，需要将数据转成字节，再传入流中；
  - 并且需要知道传输字节的大小（客户端需要根据大小来判断读取多少内容）；

> 【补充】：Node 中有一个 _Sharp_ 库，用于读取图片或者传入图片的 Buffer，对其进行处理；

# 二、Buffer 和二进制关系

我们会发现，对于前端开发来说，通常很少会和二进制直接打交道；

而对于服务器端，很多时候，必须直接去操作二进制的数据；

所以 Node 为了方便开发者完成更多功能，在全局提供给了一个类——`Buffer`；

`Buffer` 中存储的是二进制数据，可以将 `Buffer` 看成是一个存储二进制的数组；

这个数组中的每一项元素，都可以保存 **8 位二进制**： 如 `0000 0000`，即一个字节。

在计算机中，表示一个 1，不会仅仅存储一个 1，而是以 `0000 0001` 来表示，即一个字节来表示。

> 【补充】：`rgb(255, 255, 255)`；r，g，b 最大值都是 255，这是因为：
>
> 一个字节能表示的最大值 `1111 1111`，即 `256`，即表示 `0 ~ 255` 这个范围。
>
> 所以 r、g、b，在计算机中，分别都是用一个字节存储的；

为什么一个字节，是 8 位二进制数字呢？

- 在计算机中，很少的情况会直接操作一位二进制，因为它存储的数据是非常有限的；
- 所以，通常会将 8 位二进制合在一起，作为一个单元，这个单元称之为一个**字节（byte）**；
- 也就是说 `1byte = 8bit`，`1kb=1024byte`，`1M=1024kb`；`1G=1024MB`
- 比如很多编程语言中的 `int` 类型是 4 个字节，`long` 类型是 8 个字节；
- 比如 TCP 传输的是字节流，在写入和读取时，都需要说明字节的个数；

buffer 的一位，就是一个字节；一个 255；一个 8 位的二进制数字。

buffer 的三种表示方式:

- 一个字节;
- [1111 1111];
- [ff]（换算成十六进制表示，本质上还是二进制）.

# 三、Buffer 和字符串转化

我们已知，Buffer 相当于是一个存放字节的数组，数组中的每一项元素，对应一个字节的大小：

如果我们希望将一个字符串，放入到 Buffer 中，是怎么样的过程呢？

```mermaid
graph LR
A[字符串: zzt] -->|Ascll编码| B[16 进制: 7a 7a 74]
    B -->|存储| C[Buffer: 7a 7a 74]
```

1. 字符串编码。
2. 编码后保存为二进制（以十六进制显示）。
3. 存储进 buffer。

03-Node 类-Buffer\01-Buffer 和字符串的转换.js

```js
/** 创建 Buffer 的两种方式 */

// 方式一，不推荐，弃用的方式
const buf1 = new Buffer('zzt')
console.log('buf1:', buf1)
// buf1: <Buffer 7a 7a 74>

// 方式二
const buf2 = Buffer.from('zzt')
console.log('buf2:', buf2)
// buf1: <Buffer 7a 7a 74>
```

## 1.如果是中文呢？

中文汉字通常用 3 个字节存储；复杂的中文汉字，可能会使用 4 个字节存储。

03-Node 类-Buffer\01-Buffer 和字符串的转换.js

```js
// 创建 buffer，字符串中有中文
const buf3 = Buffer.from('你好啊，haha')
console.log('buf3:', buf3)
// buf3: <Buffer e4 bd a0 e5 a5 bd e5 95 8a ef bc 8c 68 61 68 61>
console.log('buf3.toString():', buf3.toString())
// 你好啊，haha
```

`buffer.toString` 方法，默认会用 `utf8` 编码将 buffer 转成字符串。

> 【补充】：utf8 编码中，包含了 Ascll 编码。

如果编码和解码不同，会出现乱码。

03-Node 类-Buffer\01-Buffer 和字符串的转换.js

```js
// 创建 buffer，手动指定编码
const buf4 = Buffer.from('你好啊', 'utf16le')
console.log('buf4:', buf4)
// 解码操作
console.log(buf4.toString())
// `O}YJU
console.log(buf4.toString('utf16le'))
// 你好啊
```

# 四、Buffer 的其它用法

详见[官方文档](https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html)

## 1.Buffer.alloc

创建一个 8 个字节长度的 Buffer，里面所有的字节数默认为 `00`；

03-Node 类-Buffer\02-buffer 的其它创建方式.js

```js
// 1.创建一个 buffer，指定内存空间为 8 个字节
const buf1 = Buffer.alloc(8)
console.log('buf1:', buf1)
// buf1: <Buffer 00 00 00 00 00 00 00 00>
```

可以对 buffer 进行手动操作:

03-Node 类-Buffer\02-buffer 的其它创建方式.js

```js
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
```

## 2.文件读取

Buffer 文件读取。

- 可读取文本。读取图片，等等。
- 通过 buffer 对二进制文件，进行操作

  1. 将读取的文件，放在 buffer 中；
  2. 对 buffer 进行操作；
  3. 再写入回文件中。

03-Node 类-Buffer\03-从文件中读取 buffer.js

```js
const fs = require('fs')

fs.readFile('./aaa.txt', { encoding: 'utf8' }, (err, data) => {
  console.log('data:', data)
  // 你好啊，李银河！
})

fs.readFile('./aaa.txt', (err, data) => {
  console.log('data.toString():', data.toString())
  // 你好啊，李银河！
})

// 手动干预文件的读取
fs.readFile('./aaa.txt', (err, data) => {
  data[0] = 0x6d
  console.log('data.toString():', data.toString())
  // m��好啊，李银河！
})

// 读取一张图片
fs.readFile('./kobe02.png', (err, data) => {
  console.log('pic data:', data)
  // <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 43 00 05 03 04 04 04 03 05 04 04 04 05 05 05 06 07 0c 08 07 07 07 07 0f 0b 0b 09 ... 36217 more bytes>
})
```

# 五、Buffer 部分源码分析

Buffer 的创建过程理解。

事实上，Node 在创建 buffer 时，并不会频繁的向操作系统申请内存；

而是默认先申请一个 `8 * 1024 byte` 大小的内存，也就是 `8kb`；

如果一次性申请超过了 `8kb` 的内存，Node 会直接申请相应的内存大小。

[Node 源码](https://github.com/nodejs/node/blob/main/lib/buffer.js)

```js
Buffer.poolSize = 8 * 1024
let poolSize, poolOffset, allocPool

const encodingsMap = { __proto__: null }
for (let i = 0; i < encodings.length; ++i) encodingsMap[encodings[i]] = i

function createPool() {
  poolSize = Buffer.poolSize
  allocPool = createUnsafeBuffer(poolSize).buffer
  markAsUntransferable(allocPool)
  poolOffset = 0
}
createPool()
```

`Buffer.form` 源码。

[Node 源码](https://github.com/nodejs/node/blob/main/lib/buffer.js)

```js
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 */
Buffer.from = function from(value, encodingOrOffset, length) {
  if (typeof value === 'string') return fromString(value, encodingOrOffset)

  if (typeof value === 'object' && value !== null) {
    if (isAnyArrayBuffer(value)) return fromArrayBuffer(value, encodingOrOffset, length)

    const valueOf = value.valueOf && value.valueOf()
    if (
      valueOf != null &&
      valueOf !== value &&
      (typeof valueOf === 'string' || typeof valueOf === 'object')
    ) {
      return from(valueOf, encodingOrOffset, length)
    }

    const b = fromObject(value)
    if (b) return b

    if (typeof value[SymbolToPrimitive] === 'function') {
      const primitive = value[SymbolToPrimitive]('string')
      if (typeof primitive === 'string') {
        return fromString(primitive, encodingOrOffset)
      }
    }
  }

  throw new ERR_INVALID_ARG_TYPE(
    'first argument',
    ['string', 'Buffer', 'ArrayBuffer', 'Array', 'Array-like Object'],
    value
  )
}
```

`fromString` 源码。

[Node 源码](https://github.com/nodejs/node/blob/main/lib/buffer.js)

```js
function fromString(string, encoding) {
  let ops
  if (typeof encoding !== 'string' || encoding.length === 0) {
    if (string.length === 0) return new FastBuffer()
    ops = encodingOps.utf8
    encoding = undefined
  } else {
    ops = getEncodingOps(encoding)
    if (ops === undefined) throw new ERR_UNKNOWN_ENCODING(encoding)
    if (string.length === 0) return new FastBuffer()
  }
  return fromStringFast(string, ops)
}
```

fromStringFast 源码。

- 这里做的事情是，判断 8kb 内存中，剩余的长度是否还足够填充这个字符串；
- 如果不足够，那么就要通过 `createPool` 创建新的空间；
- 如果够就直接使用，但是之后要进行 `poolOffset` 的偏移变化；

[Node 源码 ](https://github.com/nodejs/node/blob/main/lib/buffer.js)node/lib/buffer.js：428 行

```js
function fromStringFast(string, ops) {
  const length = ops.byteLength(string)

  if (length >= Buffer.poolSize >>> 1) return createFromString(string, ops.encodingVal)

  if (length > poolSize - poolOffset) createPool()
  let b = new FastBuffer(allocPool, poolOffset, length)
  const actual = ops.write(b, string, 0, length)
  if (actual !== length) {
    // byteLength() may overestimate. That's a rare case, though.
    b = new FastBuffer(allocPool, poolOffset, actual)
  }
  poolOffset += actual
  alignPool()
  return b
}
```

# 六、Stream 是什么？

Stream 翻译为”小溪“、”小河“。在编程中，通常翻译为“流”？

从一个文件中读取数据时，文件的二进制（字节）数据，会源源不断的被读取到程序中；而这个一连串的字节，就是程序中的流；

所以，我们可以这样理解”流”：

- 是连续字节的一种表现形式和抽象概念；
- 流应该是可读的，也是可写的；

我们已知，可以使用 `readFile` 或者 `writeFile` 方法，一次性读写文件；

这种方式虽然简单直接，但是无法控制一些细节的操作；

- 比如：从什么位置开始读、读到什么位置、一次性读取多少个字节；
- 比如：读到某个位置后，暂停读取，某个时刻恢复继续读取等等；
- 比如：这个文件非常大，像一个视频文件，一次性全部读取并不合适；

04-Node 中的流-Stream\01-可读流的基本使用.js

```js
const fs = require('fs')

// 一次性读取
// 缺点一: 没有办法精准控制从哪里读取, 读取什么位置.
// 缺点二: 读取到某一个位置的, 暂停读取, 恢复读取.
// 缺点三: 文件非常大的时候, 多次读取.
fs.readFile('./aaa.txt', (err, data) => {
  console.log('data:', data)
  // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 2c 20 4d 79 20 6e 61 6d 65 20 69 73 20 7a 7a 74>
})
```

# 七、文件读写的流

事实上 Node 中很多对象，是基于流 Stream 实现的：

- 比如：_http_ 模块的 `Request` 和 `Response` 对象；

官方文档也提到：所有的流 Stream，都是 EventEmitter 的实例。

Node.js 中有四种基本流类型：

- **Readable**：可以从中读取数据的流（例如 `fs.createReadStream()`）。
- **Writable**：可以向其写入数据的流（例如 `fs.createWriteStream()`）。
- **Duplex**：同时为 Readable 和 Writable（例如 `net.Socket`）。
- **Transform**：Duplex 可以在写入和读取数据时修改或转换数据的流（例如 `zlib.createDeflate()`）用于压缩。

这里我们通过 `fs` 的操作，重点介绍 **Writable**、**Readable**。

# 八、Readable 可读流

使用 `fs.createReadStream` 方法，其中传入的 options 中，有几个参数，更多参数参考[官方文档](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fscreatereadstreampath-options)：

- `start`：文件读取开始的位置；
- `end`：文件读取结束的位置（包括，闭区间）；
- `highWaterMark`：一次性读取字节的长度，默认是 `64kb`；

Readable 的基本使用：

04-Node 中的流-Stream\01-可读流的基本使用.js

```js
// 2.通过流读取文件
const readStream = fs.createReadStream('./aaa.txt', {
  start: 8,
  end: 18,
  highWaterMark: 3
})

readStream.on('data', data => {
  console.log('data.toString():', data.toString())
  readStream.pause()

  setTimeout(() => {
    readStream.resume()
  }, 2000)
})
// data.toString(): rld
// data.toString(): , M
// data.toString(): y n
// data.toString(): am
```

Readable 的其他事件。

04-Node 中的流-Stream\02-可读流的其它事件.js

```js
const fs = require('fs')

const readStream = fs.createReadStream('./aaa.txt', {
  start: 8,
  end: 18,
  highWaterMark: 3
})

readStream.on('data', data => {
  console.log('data.toString():', data.toString())
})

// 补充其它的事件 监听
readStream.on('open', fd => {
  console.log('通过流，将文件打开了~， fd:', fd)
})

readStream.on('end', () => {
  console.log('已读取到 end 位置~')
})

readStream.on('close', () => {
  console.log('文件读取结束，被关闭~')
})
```

# 九、Writable 可写流

我们已知可以使用 `fs.writeFile` 来一次性的写入文件；

这种方式，相当于一次性将所有的内容，写入到文件中；这种方式有很多问题：

- 比如无法控制一点点地写入内容，精确每次写入的位置等；

04-Node 中的流-Stream\03-可写流的使用过程.js

```js
const fs = require('fs')

// 一次性写入
fs.writeFile(
  './bbb.txt',
  'hello frog',
  {
    encoding: 'utf8',
    flag: 'a+'
  },
  err => {
    if (err) {
      console.log('写入文件出错了~')
    } else {
      console.log('写入文件完成了~')
    }
  }
)
```

这个时候，使用 `fs.createWriteStream`，传入其中的 options 中，有几个参数，更多参数参考[官网文档](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fscreatewritestreampath-options)：

- `flags`：默认是 `w`，如果我们希望是追加写入，可以使用 `a` 或者 `a+`；
- `start`：写入的位置；

> 【注意】：`flag` 使用 `a+` 时，Windows 系统上该操作是无效的，要使用 `r+`；
>
> ```js
> // 从第 5 个字节，开始写入。
> const writeStream = fs.createWriteStream('./ccc.txt', {
>   flags: 'r+',
>   start: 5
> })
> ```

Writable 的使用：

04-Node 中的流-Stream\03-可写流的使用过程.js

```js
// 2.创建一个写入流
const writeStream = fs.createWriteStream('./ccc.txt', {
  flags: 'a'
})

writeStream.write('zzt')
writeStream.write('aaa')
writeStream.write('bbb', err => {
  if (err) {
    console.log('bbb 写入出错了~')
  } else {
    console.log('bbb 写入完成~')
  }
})

/**
 * 写入完成后，需要手动关闭文件，有两种方式；
 * - 方式一：close
 * - 方式二：end
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
```

## 1.close 的监听

我们会发现，使用 `createWriteStream` 时，并不能**直接**监听到 `"close"` 事件：

- 这是因为：写入流在打开后是不会自动关闭的；必须手动关闭，来告诉 Node 已经写入结束了；
- 手动关闭后，Node 会发出一个 `"finish"` 事件的；

写入流有一个常用的方法是 `end`：该方法相当于做了两步操作：

1. 写入传入的数据；
2. 调用 `close` 方法；

读取可以监听到 `“end”`、`"close"` 事件；

写入仅仅能监听到 `"finish"`，`“close“` 事件。

# 十、pipe 方法

通过程序代码，实现文件的拷贝，有三种方式：

方式一：一次性读取文件，并写入文件，以实现复制文件的效果。

04-Node 中的流-Stream\04-文件的拷贝流操作.js

```js
const fs = require('fs')

// 方式一：一次性读取文件，再一次性写入文件
fs.readFile('./foo.txt', (err, data) => {
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
})
```

方式二：创建可读流，可写流，实现文件复制的效果。

04-Node 中的流-Stream\04-文件的拷贝流操作.js

```js
const fs = require('fs')

// 方式二：使用可读流、可写流
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo-copy02.txt')

readStream.on('data', data => {
  writeStream.write(data)
})

readStream.on('end', () => {
  writeStream.close()
})
```

方式三：在可读流，可写流之间，建立一个管道 pipe。

04-Node 中的流-Stream\04-文件的拷贝流操作.js

```js
const fs = require('fs')

// 方式三：在可读流，可写流之间，建立一个 pipe 通道。
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo-copy03.txt')

readStream.pipe(writeStream)
```
