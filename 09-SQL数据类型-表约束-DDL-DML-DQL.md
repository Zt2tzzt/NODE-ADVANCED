# SQL数据类型 & 表约束 & DDL & DML & DQL

## 一、SQL 数据类型

数据库中，有不同的数据类型：

MySQL 支持的数据类型有：

- 数字类型；
- 日期和时间类型；
- 字符串（字符和字节）类型；
- 空间类型；
- JSON 数据类型。

### 1.数字类型

MySQL 的数字类型有很多：

整数数字类型：`INTEGER`，`INT`，`SMALLINT`，`TINYINT`，`MEDIUMINT`，`BIGINT`；参考[官方文档](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

| Type      | Storage (Bytes) | Minimum Value Signed | Minimum Value Unsigned | Maximum Value Signed | Maximum Value Unsigned |
| :-------- | :-------------- | :------------------- | :--------------------- | :------------------- | :--------------------- |
| TINYINT   | 1               | -128                 | 0                      | 127                  | 255                    |
| SMALLINT  | 2               | -32768               | 0                      | 32767                | 65535                  |
| MEDIUMINT | 3               | -8388608             | 0                      | 8388607              | 16777215               |
| INT       | 4               | -2147483648          | 0                      | 2147483647           | 4294967295             |
| BIGINT    | 8               | -2^63^               | 0                      | 2^63^-1              | 2^64^-1                |

浮点数字类型：`FLOAT`，`DOUBLE`：

- `FLOAT` 是 4 个字节，`DOUBLE` 是 8 个字节；

精确数字类型：`DECIMAL`，`NUMERIC`：

- `DECIMAL` 是 `NUMERIC` 的实现形式；

> 【注意】：布尔类型，一般使用 `TINYINT` 类型表示，false: 0，true: 1。

常用的是 `INT`、`DOUBLE` 类型。

### 2.日期类型

MySQL 的日期类型很多：

`YEAR` 类型，以 `YYYY` 格式显示值：

- 范围 1901 到 2155，和 0000。

`DATE` 类型，以 `YYYY-MM-DD` 格式显示值；

- 用于具有日期部分，没有时间部分的值：
- 支持的范围是 '1000-01-01' 到 '9999-12-31'；

`DATETIME` 类型，以格式 `YYYY-MM-DD hh:mm:ss` 显示值；

- 用于包含日期和时间部分的值：
- 支持的范围是：'1000-01-01 00:00:00' 到 '9999-12-31 23:59:59';

`TIMESTAMP` 数据类型（常用），以格式 `YYYY-MM-DD hh:mm:ss` 显示值；

- 被用于同时包含日期和时间部分的值：
- 但是它的范围，是 UTC 的时间范围：即，'1970-01-01 00:00:01' 到 '2038-01-19 03:14:07';

> 另外：`DATETIME` 或 `TIMESTAMP` 值，可以包括在高达微秒（6 位）精度的后小数秒一部分（了解）
>
> 比如 `DATETIME` 表示的范围可以是 '1000-01-01 00:00:00.000000' 到 '9999-12-31 23:59:59.999999';

### 3.字符串类型

MySQL 的字符串类型，表示方式如下：

`CHAR` 类型（用的少），在创建表时，为固定长度，长度可以是 `0 - 255` 之间的任何值；

- 在被查询时，会删除后面的空格；

`VARCHAR` 类型的值（常用），是可变长度的字符串，长度可以指定为 `0 - 65535` 之间的值；

- 在被查询时，不会删除后面的空格；
- 比如：`VARCHAR(20)` 表示 20 个字符的长度。

`BINARY` 和 `VARBINARY` 类型，用于存储二进制字符串，存储的是字节字符串；详见[官方文档](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)。

`TEXT` 用于存储大的字符串类型，比如文章；

### 4.Blob 类型

`BLOB` 类型，用于存储大的二进制文件，如视频；

- 在数据库中，保存大的二进制文件，没有体现出数据库的优势。
- 一般把大文件，存储到服务器某个位置，再把文件信息保存到数据库中。

## 二、表约束

主键 -`PRIMARY KEY`；

一张表中，为了区分每一条记录的唯一性，必须有一个字段是永远不会重复，并且不会为空的，通常这个字段会设置为主键：

- 主键是表中唯一 `UNIQUE` 的索引；
- 主键必须是 `NOT NULL` 的（MySQL 会隐式的设置为 `NOT NULL`）；
- 主键也可以是多列索引，`PRIMARY KEY(key_part, ...)`，一般称之为**联合主键**；
- 主键字段，应该是和业务无关的，尽量不要使用业务字段，来作为主键；

唯一 -`UNIQUE`：

某些字段在开发中，我们希望是唯一的，不会重复的，这个字段我们可以使用 `UNIQUE` 来约束：比如手机号码、身份证号码等，

- `UNIQUE` 约束的字段，在表中必须是不同的；
- `UNIQUE` 索引允许 NULL，允许包含的列具有多个 NULL 值；

不能为空 -`NOT NULL`：

- 某些字段，要求必须有值，可以使用 `NOT NULL` 来约束；

默认值 -`DEFAULT`：

- 某些字段，希望在没有设置值时，给予一个默认值，使用 `DEFAULT` 来完成；

自动递增 -`AUTO_INCREMENT`：

- 某些字段，希望不设置值时，可以进行递增，这个时候可以使用 `AUTO_INCREMENT` 来完成；
- 比如用户的 id。

外键约束，也是最常用的一种约束手段，涉及到多表之间的关系。

## 三、DDL 语句

### 1.查看表

```mysql
SHOW TABLES;
```

### 2.创建表

基本结构。

```mysql
CREATE TABLE IF NOT EXISTS `users`(
  name VARCHAR(10),
  age INT,
  height DOUBLE
);
```

完整结构.

```mysql
CREATE TABLE IF NOT EXISTS `user` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) UNIQUE NOT NULL,
  level INT DEFAULT 0,
  telephone VARCHAR(20) UNIQUE
)
```

表中字段创建后，可以修改类型。

### 3.删除表

```mysql
DROP TABLE `user`;

# 更严谨的写法
DROP TABLE IF EXISTS `user`;
```

### 4.修改表

修改表名

```mysql
ALTER TABLE `user` RENAME TO `users`;
```

添加新字段

```mysql
ALTER TABLE `users` ADD createTime TIMESTAMP;

ALTER TABLE `users` ADD updateTime TIMESTAMP;
```

修改字段类型：

```mysql
ALTER TABLE `users` MODIFY updateTime DATETIME;
```

修改字段名,并修改类型：

```mysql
ALTER TABLE `users` CHANGE createTime createAt DATETIME；
```

删除字段。

```mysql
ALTER TABLE `users` DROP createAt;
```

> 在 Navicat 中，右击表，点击设计表，查看字段的相关信息。

## 四、DML 语句

创建一个新表，商品表；

```mysql
CREATE TABLE IF NOT EXISTS `t_products`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(200) DEFAULT '',
  price DOUBLE DEFAULT 0,
  publishTime DATETIME
);
```

### 1.插入数据

```mysql
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('iphone100', 'iphone100只要998', 998, '2122-10-10');
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('小米99', '小米99只要998', 998, '2123-10-10');
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('华为666', '华为666只要6666', 998, '2166-10-10');
```

### 2.删除数据

删除表中所有数据，慎用！

```mysql
DELETE FROM `t_products`;
```

使用条件匹配，进行删除。

```mysql
DELETE FROM `t_products` WHERE id = 4;
```

### 3.修改数据

修改表中所有数据，慎用！

```mysql
UPDATE `t_products` SET price = 8888;
```

使用条件匹配，进行修改：

```mysql
UPDATE `t_products` SET price = 6666 WHERE id = 6;
```

> 【补充】：修改某条数据时，将最新的修改时间，保存到 `updateTime` 字段上。
>
> ```mysql
> ALTER TABLE `t_products` ADD updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
> ```

## 五、DQL 语句

**DQL：Data Query Language**（数据查询语言）。

SELECT 用于从一个或者多个表中，检索选中的行（Record）。

查询的格式如下：

```mysql
SELECT select_expr [, select_expr]...
[FROM table_references]
[WHERE where_condition]
[ORDER BY expr [ASC | DESC]]
[LIMIT {[offset,] row_count | row_count OFFSET offset}]
[GROUP BY expr]
[HAVING where_condition]
```

### 0.数据准备

创建一个新表。

```mysql
CREATE TABLE IF NOT EXISTS `products` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand VARCHAR ( 20 ),
  title VARCHAR ( 100 ) NOT NULL,
  price DOUBLE NOT NULL,
  score DECIMAL ( 2, 1 ),
  voteCnt INT,
  url VARCHAR ( 100 ),
  pid INT
);
```

使用代码插入数据。插入了 108 条数据。

demo-project\09-mySQL\01_查询语句-准备数据.js

```js
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'xxxxx',
  database: 'music_db'
})

const statement = `INSERT INTO products SET ?;`

const phoneJson = require('./phone.json')

for (let phone of phoneJson) {
  connection.query(statement, phone)
}
```

### 1.基本查询

查询所有数据。

```mysql
SELECT * FROM products;
```

查询特定的字段。

```mysql
SELECT id, brand, title, price FROM products;
```

查询时给字段取别名。`AS` 关键字可省略。

```mysql
SELECT id AS pid, brand phonebrand, title, price FROM `products`;
```

### 2.条件查询

`WHERE` 查询字句。

#### 1.比较运算符

```mysql
SELECT * FROM products WHERE price < 1000;
SELECT * FROM products WHERE price <= 3000;
SELECT * FROM products WHERE price = 8699;
SELECT * FROM products WHERE brand = '华为';
SELECT * FROM products WHERE brand != '苹果';
```

#### 2.逻辑运算符

逻辑与，逻辑或。

```mysql
SELECT * FROM products WHERE brand = '华为' && price < 2000;
SELECT * FROM products WHERE brand = '华为' AND price < 2000;

SELECT * FROM products WHERE brand = '华为' || price < 5000;
SELECT * FROM products WHERE brand = '华为' OR price < 5000;
```

区间范围。

```mysql
SELECT * FROM products WHERE price >= 1000 && price <= 2000;
SELECT * FROM products WHERE price BETWEEN 1000 AND 2000;
```

枚举出多个结果，取其中之一。

```mysql
SELECT * FROM products WHERE brand = '小米' OR brand = '华为';
SELECT * FROM products WHERE brand IN ('小米', '华为');
```

### 3.模糊查询

模糊查询，使用 `LIKE` 关键字，结合两个特殊的符号：

- `%` 表示匹配任意个的任意字符；
- `_` 表示匹配一个的任意字符；

```mysql
# 查询所有 title 以 ’v‘ 开头的商品
SELECT * FROM products WHERE title LIKE 'v%';

# 查询所有 title 带 'v' 的商品.
SELECT * FROM products WHERE title LIKE '%v%';

# 查询所有 title 第三个字符是 ’M‘/’m‘ 的商品,
SELECT * FROM products WHERE title LIKE '__m%';
```

> 以上查询条件，不仅仅适用于 DQL 查询语句，也适用于 DML 修改，删除语句。

### 4.排序

当查询到结果时，将结果按照某种方式进行排序；这个时候使用的是 `ORDER BY`；有两个常用的值：

- `ASC`：升序排列；
- `DESC`：降序排列；

```mysql
# 查询所有的价格小于 1000 的手机, 并且按照评分的降序获取结果
SELECT * FROM products
  WHERE price < 1000
  ORDER BY score DESC
```

### 5.分页

当数据库中的数据非常多时，一次性查询到所有的结果进行显示是不太现实的：

- 在真实开发中，都会要求前端传入 `offset`、`limit` 等字段；
- 以便可以在数据库中进行分页查询；
- 它的用法有 `[LIMIT {[offset,] row_count | row_count OFFSET offset}]`

```mysql
# 没有 `OFFSET` 默认不偏移。
SELECT * FROM products LIMIT 20;

# 完整写法
SELECT * FROM products LIMIT 20 OFFSET 40;

# 上面 SQL 命令，另外一种写法，阅读性不好。
SELECT * FROM products LIMIT 40, 20;
```
