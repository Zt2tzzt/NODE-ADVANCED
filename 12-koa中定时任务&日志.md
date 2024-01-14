# koa中定时任务&日志

## 一、cron-linke 语法

Cron是一种工具，它在 UNIX-like 操作系统中，定期运行指定的命令或脚本。

一个 cron-like 的语法字符串，被用来表示这些执行周期；

这种字符串有五个，或六个字段（取决于实现方式），这些字段使用空格分隔。标准的分隔形式为：

```text
*     *     *   *    *        command to be executed
-     -     -   -    -
|     |     |   |    |
|     |     |   |    +----- day of the week (0 - 6) (Sunday=0)
|     |     |   +------- month (1 - 12)
|     |     +--------- day of the month (1 - 31)
|     +----------- hour (0 - 23)
+------------- min (0 - 59)
```

如果要每天早上5点自动执行某个命令，你可以这样设定：

```text
0 5 * * *
```

如果你想要每小时的第30分钟执行某个命令，你可以这样设定：

```text
30 * * * *
```

如果你想要每周一到周五的下午5点（17:00）执行某个命令，你可以这样设定：

```text
0 17 * * 1-5
```

## 二、定时任务

下载 [node-schedule](https://github.com/node-schedule/node-schedule) 库。

在项目中，创建一个定时任务。

src\schedule\stock.schedule.js

```javascript
const schedule = require('node-schedule')

// 每天 23 时 55 分执行任务。
const stockJob = schedule.scheduleJob('55 23 * * *', () => {
  // 这里是任务内容
})

module.exports = stockJob

```

在项目中引入定时任务

src\app\index.js

```javascript
const Koa = require('koa')
const k2c = require("koa2-connect");
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

// 创建 Koa 服务器
const app = new Koa()

// 静态资源
app.use(static('./assets'))
app.use(static('./dist'))

app.use(bodyParser())

// 导入计划作业
require('../schedule/stock.schedule')
require('../schedule/delivery.schedule')

// 注册路由
registerRouters(app)

// 将 app 导出
module.exports = app
```

## 三、日志服务

安装 [winston](https://github.com/winstonjs/winston) 库；

```shell
npm install winston
```

使用 `winston` 创建 `logger` 实例

src\app\logger.js

```javascript
const { createLogger, format, transports } = require('winston')
const path = require('path')

const { combine, timestamp, printf, } = format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    // 记录所有级别日志到日志文件
    new transports.File({ filename: path.resolve(__dirname, '../../log/combined.log') })
  ]
})

module.exports = logger
```

在定时任务中，使用 `logger`，输出日志。

src\schedule\stock.schedule.js

```javascript
const schedule = require('node-schedule')
const { postStocksGroupData } = require('../webService/features')
const { list } = require('../service/storehouse.service')
const { upsert } = require('../service/stock.service')
const logger = require('../app/logger')

console.log('~stock schedule in~')

const stockJob = schedule.scheduleJob('55 23 * * *', () => {
  let storehouse

  list()
    .then(res => {
      storehouse = res
      console.log('storehouse', storehouse)

      const promises = storehouse.map(item => postStocksGroupData(item.code))
      return Promise.allSettled(promises)
    })
    .then(res =>
      Promise.allSettled(
        res.map((item, index) => {
          const store = storehouse[index]
          const data = item.value
          const err = item.reason

          switch (item.status) {
            case 'fulfilled':
              console.log(`${store.code} stock response`, data)
              logger.info(`[${store.code} STOCK RESPONSE RES] - ${JSON.stringify(data)}`)
              return upsert(store.id, data.data.stocksData[0])
            default:
              console.log(`${store.code} stock response error`, err)
              logger.error(`[${store.code} STOCK RESPONSE ERROR] - ${JSON.stringify(err)}`)
              return Promise.reject(err)
          }
        })
      )
    )
    .then(res => {
      res.forEach((item, index) => {
        const store = storehouse[index]
        const data = item.value
        const err = item.reason

        switch (item.status) {
          case 'fulfilled':
            console.log(`${store.code} stock upsert success`, JSON.stringify(data))
            logger.info(`[${store.code} STOCK UPSERT SUCCESS] - ${JSON.stringify(data)}`)
            break
          default:
            console.log(`${store.code} stock upsert error`, JSON.stringify(err))
            logger.error(`[${store.code} STOCK UPSERT ERROR] - ${JSON.stringify(err)}`)
            break
        }
      })
    })
    .catch(err => {
      console.log('unknown err:', err)
      logger.error(`[UNKNOWN ERROR - ${JSON.stringify(err)}`)
    })
})

module.exports = stockJob

```
