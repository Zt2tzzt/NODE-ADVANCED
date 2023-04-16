const express = require('express')
const userRouter = require('./router/userRouter')

const app = express()

// 用户相关的接口，使用 app 注册中间件
/* app.get('/users', (req, res, next) => {
  res.end('返回了用户列表~')
})
app.get('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('返回了用户信息~')
})
app.post('/users', (req, res, next) => {
  res.end('新增了用户列表~')
})
app.delete('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('删除了用户~')
})
app.patch('/users/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('修改了用户~')
}) */

/* 
const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
  res.end('返回了用户列表~')
})
userRouter.get('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('返回了用户信息~')
})
userRouter.post('/', (req, res, next) => {
  res.end('新增了用户列表~')
})
userRouter.delete('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('删除了用户~')
})
userRouter.patch('/:id', (req, res, next) => {
  console.log('id:', req.params.id)
  res.end('修改了用户~')
}) */

app.use('/users', userRouter)

app.listen(9000, () => {
  console.log('express 服务器启动成功了')
})