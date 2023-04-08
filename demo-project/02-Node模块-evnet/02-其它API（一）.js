const EventEmitter = require('events')

const ee = new EventEmitter()

ee.on('zzt', () => {})
ee.on('zzt', () => {})
ee.on('zzt', () => {})

ee.on('kobe', () => {})
ee.on('kobe', () => {})

// 1.获取所有监听事件的名称
console.log(ee.eventNames())
// [ 'zzt', 'kobe' ]

// 2.获取监听最大的监听个数
console.log(ee.getMaxListeners())
// 10

// 3.获取某一个事件名称对应的监听器个数
console.log(ee.listenerCount('zzt'))
// 3

// 4.获取某一个事件名称对应的监听器函数(数组)
console.log(ee.listeners('zzt'))
// [
//   [Function (anonymous)],
//   [Function (anonymous)],
//   [Function (anonymous)]
// ]
