const http = require('http')

/* http.get('http://localhost:8000', res => {
	// res 本质是可读流，从中读取数据
	res.on('data', data => {
		const dataString = data.toString()
		console.log('dataString:', dataString)
		// [{"name":"zzt","age":18},{"name":"kobe","age":30}]

		const dataInfo = JSON.parse(dataString)
		console.log('datainfo:', dataInfo)
		// [ { name: 'zzt', age: 18 }, { name: 'kobe', age: 30 } ]
	})
}) */

const req = http.request({
	method: 'POST',
	hostname: 'localhost',
	port: 8000
}, res => {
	res.on('data', data => {
		
		const dataString = data.toString()
		console.log('dataString:', dataString)
		// [{"name":"zzt","age":18},{"name":"kobe","age":30}]

		const dataInfo = JSON.parse(dataString)
		console.log('datainfo:', dataInfo)
		// [ { name: 'zzt', age: 18 }, { name: 'kobe', age: 30 } ]
	})
})

req.end()
