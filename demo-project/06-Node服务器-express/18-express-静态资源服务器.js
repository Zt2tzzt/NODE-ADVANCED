const express = require('express')

const app = express()

app.use(express.static('./uploads'))  // 可使用 localhost:9000/1668309647120_kobe02.png 直接访问 ./upload 目录下的图片资源。
app.use(express.static('./build')) // 可使用 localhost:9000 直接在 ./build 目录下的浏览器中访问项目的静态资源

app.get('/home', (req, res, next) => {
  
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})