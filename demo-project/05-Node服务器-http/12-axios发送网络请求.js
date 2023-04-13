const axios = require('axios')

axios.get('http://localhost:8000').then(res => {
	console.log('res.data:', res.data)
	// [ { name: 'zzt', age: 18 }, { name: 'kobe', age: 30 } ]
})
