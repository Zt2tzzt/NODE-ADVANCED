# 一、MySQL 查询转对象
在 Node 中，常用的**数据库驱动**是 mysql2.

前面编写的查询语句，查询到的结果，通常是一张表，比如查询“手机+品牌”的信息：

单表查询时，mysql2 会将表，转化成数组返回，其中，每个元素，是一个个对象，类似于如下形式：

```json
[{...}, {...}, {...}, ...]
```

使用如下 SQL 语句查询：

```mysql
SELECT * FROM products LEFT JOIN brand ON products.brand_id = brand.id;
```

多表查询时，同样的，mysql2 也会将表转化成数组返回，其中每个元素，是一个个对象。

- 但是，我们往往希望，LEFT JOIN 的表（`brands` 表）中，查询到的结果，能够作为一个对象返回，就像如下的格式一样。
- 使用 `JSON_OBJECT('[属性名]', [字段名])`

```json
[{..., brand: {...}}, {..., brand: {...}}, {..., brand: {...}}, ...]
```

使用如下 SQL 语句查询：

```mysql
SELECT
  products.id AS id,
	products.title AS title,
	products.price AS price,
	products.score AS score,
	JSON_OBJECT(
		'id', brands.id,
		'name', brands.name,
		'rank', brands.worldRank,
		'website', brands.website
	) AS brand
FROM products
LEFT JOIN brands
	ON products.brand_id = brands.id;
```

# 二、MySQL 查询转数组

在多对多关系中，我们希望查询到的是一个数组：
- 比如一个学生的多门课程信息，应该是放到一个数组中的；
- 数组中存放的是课程信息的一个个对象；
- 这个时候我们要 `JSON_ARRAYAGG()` 和 `JSON_OBJECT()` 结合来使用；

使用 mysql2 查询到的是如下形式的数据：

```json
[{..., course: [{...}, {...}, {...}, ...]}, {..., course: [{...}, {...}, ...], ...}, ...]
```

使用如下 SQL 语句查询：

```mysql
SELECT
	stu.id,
	stu.name,
	stu.age,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'id', cs.id,
			'name', cs.name
		)
	) AS courses
FROM students stu
LEFT JOIN students_select_courses ssc
	ON stu.id = ssc.student_id
LEFT JOIN courses cs
	ON ssc.course_id = cs.id
GROUP BY stu.id;
```

> 以上两种方式，虽然可以通过代码处理，但 MySQL 已提供了函数，更加方便。

# 三、mysql2 是什么

在 GUI 工具中，通过执行 SQL 语句，可以获取执行结果；

在真实开发中，是通过代码来完成所有的操作的。

在 Node 的代码中，要执行 SQL 语句，需要使用**数据库驱动**，可以借助于两个库：
- *mysql*：最早的 Node 连接 MySQL 的数据库驱动；
- *mysql2*：在 *mysql* 数据驱动的基础之上，进行了很多的优化、改进；

目前，我更偏向于使用 *mysql2*，因为它兼容 mysql 的 API，并且提供了一些附加功能。

*mysql2* 有如下优势：

- 更好的性能；
- Prepared Statement（预编译语句）：
- 支持 Promise；
- 等等...

> 不论是 Java 还是 Node 中，都提供了数据库相关的接口，库只是对接口功能的实现。

# 四、mysql2 使用

安装 *mysql2*：

```shell
npm install mysql2
```

## 1.基本使用：

1.创建一个连接。

2.定义一个 SQL 语句，使用 `statement` 名命（不成文的规范）。

3.执行 SQL 语句

- 使用 `connection.query()`；
- 这里的 `query()` 指的是 “SQL（Structure Query Language）” 中的 “query”；
- 回调函数中的参数，分别 `err` 错误信息, `values` 查询到的数据, `fields` 查询的字段；

4.销毁连接 `connection.destroy()`；

09-mySQL\02-mysql2-基本使用.js

```js
const mysql2 = require('mysql2')

// 1.创建一个连接
const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219'
})

// 2.定义操作语句
const statement = 'SELECT * FROM `students`;'

// 3.执行操作语句
connection.query(statement, (err, values, fields) => {
  if (err) {
    console.log('查询失败：', err)
  }

  console.log('values:', values)
  /* values: [
    { id: 1, name: 'zzt', age: 18 },
    { id: 2, name: 'tom', age: 22 },
    { id: 3, name: 'lilei', age: 25 },
    { id: 4, name: 'lucy', age: 16 },
    { id: 5, name: 'lily', age: 20 }
  ] */

  connection.destroy()
})
```

## 2.预处理语句

Prepared Statement（预编译语句）有如下优点：

优点一：提高性能：

1. 将创建的语句模块，发送给 MySQL；
2. MySQL 编译（解析、优化、转换）语句模块；并且存储它，但不执行；
3. 给“?”提供实际的参数后，才会执行；
4. 就算多次执行，也只会编译一次，所以性能是更高的；

优点二：防止 SQL 注入：

- 给“?”传入的值，不会在模块引擎中被编译；
- 那么，一些 SQL 注入的内容，就不会被执行；比如：`OR 1 = 1`。

使用步骤：

1.编写预处理语句时，使用 ”?“ 代替查询条件，

2.使用 `connection.execute(statement, [[条件1], [条件2], ...])`

3.销毁连接 `connection.destroy()`

09-mySQL\03-mysql2-连接池.js

```js
const mysql2 = require('mysql2')

// 1.创建一个连接
const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219'
})

// 2.定义操作语句
const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

// 3.执行操作语句
connection.execute(statement, [1000, 8], (err, values) => {
  console.log('values:', values)
  connection.destroy()
})
```

> 【补充】：SQL 注入是什么？
>
> 比如在登录 admin 帐号时，
>
> 如果后端程序，直接在 SQL 上，拼接前端传过来的参数。
>
> 那么用户在输入 password 时，在后方写上“OR 1 = 1”，相当于在 SQL 的 WHERE 字句后，拼接上"OR 1 = 1"。
>
> 这样，条件永远为真，总是能查询出数据。
>
> 预处理语句，可以有效防止这种情况。

## 3.连接池

前面的案例中，Node 程序，仅仅是创建了一个数据库连接（`connection`）；

如果要同时处理有多个请求的话，连接很有可能正在被占用。

那么，是否需要每来一个请求，都去创建一个新的连接呢？

事实上，mysql2 给我们提供了**连接池（connection pools）**；

可以在需要的时候，自动创建连接，并且创建的连接不会被销毁，而是放到连接池中，仍然可以继续使用；

可以在创建连接池的时候，设置 `connectionLimit`，也就是最大创建个数；

> 【补充】：通常用 `Set` 数据类型，来保存连接池中的连接。

09-mySQL\04-mysql2-连接池.js

```js
const mysql2 = require('mysql2')

// 1.创建一个连接
const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219',
  connectionLimit: 5
})

// 2.定义操作语句
const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

connectionPool.execute(statement, [1000, 0], (err, values) => {
  console.log('values:', values)
  connectionPool.destroy()
})
```

## 4.Promise

mysql2 支持使用 Promise 的形式，查询数据。可结合 `async` 和 `await` 语法使用。

返回的结果 `res` 是一个数组

- `res[0]: values` 表示查询到的数据；
- `res[1]: fields` 表示查询到的数据中的字段；

09-mySQL\05-mysql2-Promise写法.js

```js
const mysql2 = require('mysql2')

// 1.创建一个连接
const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  database: 'music_db',
  user: 'root',
  password: '1016zetian.L.wee1219',
  connectionLimit: 5
})

const statement = 'SELECT * FROM `products` WHERE price > ? AND score > ?;'

connectionPool
  .promise()
  .execute(statement, [1000, 9])
  .then(res => {
    const [values, fields] = res
    console.log('values', values)
  })
  .catch(err => {
    console.log('err:', err)
  })
```

> 【补充】：
>
> Node 中，其它流行的 http 服务框架：
>
> *egg.js* 基于 Koa
>
> *nest.js* 类似于 Java 的 Spring 框架，要使用 Typescript 开发。
