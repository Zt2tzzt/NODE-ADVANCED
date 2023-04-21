-- 1.查看当前数据库中有哪些表
SHOW TABLES;

-- 2.查看某一张表的表结构
DESC t_singer;

-- 3.创建一张新的表
-- 3.1.创建基本表结构
CREATE TABLE IF NOT EXISTS `users`(
	name VARCHAR(10),
	age INT,
	height DOUBLE
);
DROP TABLE IF EXISTS `users`;

-- 3.2.创建完整的表结构
CREATE TABLE IF NOT EXISTS `users`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) UNIQUE NOT NULL,
	level INT DEFAULT 0,
	telPhone VARCHAR(20) UNIQUE
);

-- 4.修改表结构
-- 4.1. 修改表名字
ALTER TABLE `users` RENAME TO `t_users`;
-- 4.2. 添加新的字段(field)
ALTER TABLE `t_users` ADD createTime TIMESTAMP;
ALTER TABLE `t_users` ADD updateTime TIMESTAMP;
-- 4.3. 修改字段的名称(field名称)
ALTER TABLE `t_users` CHANGE createTime createAt DATETIME;
-- 4.4. 删除某一个字段(field列)
ALTER TABLE `t_users` DROP createTime;
-- 4.5. 修改某一字段的类型(id int => bigint)
ALTER TABLE `t_users` MODIFY id BIGINT;

