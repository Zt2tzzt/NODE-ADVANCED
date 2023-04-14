const express = require('express')
const multer = require('multer')

const upload = multer({
  dest: './uploads'
})

const app = express()

// 使用中间件 single('[filed-name]')
app.post('/avatar', upload.single('avatar'), (req, res, next) => {
  console.log('req.file:', req.file)
  /* req.file: {
    fieldname: 'avatar',
    originalname: '53403628.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './uploads',
    filename: '6794432f26d4feb20138d586f5dea687',
    path: 'uploads\\6794432f26d4feb20138d586f5dea687',
    size: 58657
  } */
  res.end('文件上传成功~')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})