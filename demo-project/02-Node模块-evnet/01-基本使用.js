const EventEmitter = require('events') // 导入 events 模块中的事件总线

// 创建 EventEmitter 的实例
const emitter = new EventEmitter()

const handleZzt = (name, age, height) => {
  console.log('监听到 zzt 事件', name, age, height)
}

emitter.on('zzt', handleZzt)

setTimeout(() => {
  emitter.emit('zzt', 'Zt2tzzt', 18, 1.88)

  emitter.off('zzt', handleZzt)
}, 2000)
