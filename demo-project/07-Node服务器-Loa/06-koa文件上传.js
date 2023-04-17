const Koa = require('koa')
const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')

// 创建 Koa 服务器
const app = new Koa()

/* const upload = multer({
  dest: './uploads'
}) */

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads')
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

// 创建路由对象
const uploadRouter = new KoaRouter({ prefix: '/upload' })

// 在路由中，注册中间件
uploadRouter.post('/avatar', upload.single('avatar'), (ctx, next) => {
  console.log('ctx.request.file:', ctx.request.file)
  ctx.body = '文件上传成功~~'
})

uploadRouter.post('/photos', upload.array('photos'), (ctx, next) => {
  console.log('ctx.request.files:', ctx.request.file)
  ctx.body = '文件上传成功~'
})

// 注册路由
app.use(uploadRouter.routes())
app.use(uploadRouter.allowedMethods())


// 开启 Koa 服务器
app.listen(9000, () => {
  console.log('koa 服务器启动成功~')
})


