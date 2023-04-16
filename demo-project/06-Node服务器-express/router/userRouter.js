const express = require('express')

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
})

module.exports = userRouter