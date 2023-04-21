CREATE TABLE IF NOT EXISTS `products` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DECIMAL(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT
);

-- 1.基本查询
-- 1.1. 查询所有的数据的所有字段
-- SELECT * FROM `products`;

-- 1.2. 查询所有的数据, 并且指定对应的字段
SELECT id, brand, title, price FROM `products`;

-- 1.3.查到字段之后, 给字段重命名(起一个别名, AS关键字可以省略)
SELECT id AS phoneId, brand phoneBrand, title, price FROM `products`;

-- 2.查询条件(比较运算符)
-- 2.1. 查询所有价格小于1000的手机
SELECT * FROM `products` WHERE price < 1000;
-- 2.2. 查询价格大于等于3000的手机
SELECT * FROM `products` WHERE price >= 3000;
-- 2.3. 查询价格等于8699的手机
SELECT * FROM `products` WHERE price = 8699;
-- 2.4. 查询所有的华为品牌的手机
SELECT * FROM `products` WHERE brand = '华为';
-- 2.5. 查询所有的不是苹果手机品牌的商品
SELECT * FROM `products` WHERE brand != '苹果';


-- 3.查询条件(逻辑运算符)
-- 3.1. 查询brand为华为, 并且价格小于2000的手机
SELECT * FROM `products` WHERE brand = '华为' && price < 2000;
SELECT * FROM `products` WHERE brand = '华为' AND price < 2000;
-- 3.2. 查询brand为华为, 或者价格大于5000的手机
SELECT * FROM `products` WHERE brand = '华为' || price > 5000;
SELECT * FROM `products` WHERE brand = '华为' OR price > 5000;

-- 3.3. 查询区间范围
SELECT * FROM `products` WHERE price >= 1000 && price <= 2000;
SELECT * FROM `products` WHERE price BETWEEN 1000 AND 2000;


-- 3.4.枚举出多个结果, 其中之一: 小米或者华为
SELECT * FROM `products` WHERE brand = '小米' OR brand = '华为';
SELECT * FROM `products` WHERE brand IN ('小米', '华为');



-- 4.查询条件(模糊查询LIKE)
-- 4.1.查询所有title以v开头的商品
SELECT * FROM `products` WHERE title LIKE 'v%';
-- 4.2.查询所有title带v的商品
SELECT * FROM `products` WHERE title LIKE '%v%';
-- 4.3.查询所有title带M, 并且M必须是第三个字符
SELECT * FROM `products` WHERE title LIKE '__M%'



-- 5.对结果进行排序(ORDER BY)
-- 5.1. 查询所有的价格小于1000的手机, 并且按照评分的降序获取结果
SELECT * FROM `products` 
	WHERE price < 1000
	ORDER BY score DESC;

SELECT * FROM `products` 
	WHERE price < 1000
	ORDER BY score ASC;


-- 6.对表进行分页查询
-- 6.1.默认不偏移(偏移0条数据)
SELECT * FROM `products` LIMIT 20;
-- 6.2.指定偏移多少条数据(size: 20, offset: 40)
SELECT * FROM `products` LIMIT 20 OFFSET 40;

-- 6.3.另外一种写法
SELECT * FROM `products` LIMIT 40, 20;

