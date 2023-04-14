const express = require('express')
const multer = require('multer')

const upload = multer({
  // dest: './uploads',
  storage: multer.diskStorage({
    destination(req, res, callback) {
      callback(null, './uploads')
    },
    filename(req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname)
    }
  })
})

const app = express()

// 上传单文件
app.post('/avatar', upload.single('avatar'), (req, res, next) => {
  console.log('req.file:', req.file)
  res.end('头像上传成功~')
})

// 上传多文件
app.post('/photos', upload.array('photos'), (req, res, next) => {
  console.log('req.files:', req.files)
  res.end('上传照片成功~')
})

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})