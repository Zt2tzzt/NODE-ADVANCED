-- 1.新建商品表
CREATE TABLE IF NOT EXISTS `t_products`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(20) UNIQUE NOT NULL,
	description VARCHAR(200) DEFAULT '',
	price DOUBLE DEFAULT 0,
	publishTime DATETIME
);


-- 2.DML语句: 插入数据
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('iPhone100', 'iPhone100只要998', 998, '2122-09-10');
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('小米99', '小米99只要888', 888, '2123-10-10');
INSERT INTO `t_products` (title, description, price, publishTime) VALUES ('华为666', '华为666只要6666', 6666, '2166-06-06');

-- 3.DML语句: 删除数据
-- 3.1.删除表中所有的数据(慎重使用);
-- DELETE FROM `t_products`;
-- 3.2.根据条件, 比如id删除某一条
-- DELETE FROM `t_products` WHERE id = 4;


-- 4.DML语句: 修改数据
-- 4.1.修改表中的所有数据;
-- UPDATE `t_products` SET price = 8888;
-- 4.2. 根据条件修改某一条数据
-- UPDATE `t_products` SET price = 8888 WHERE id = 6;
UPDATE `t_products` SET price = 12998, title = '华为至尊版' WHERE id = 6;


-- 5.扩展: 当修改某一条数据时, 使用最新的时间记录
ALTER TABLE `t_products` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;