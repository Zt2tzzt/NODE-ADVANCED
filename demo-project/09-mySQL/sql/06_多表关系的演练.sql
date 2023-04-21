-- 1.创建歌曲表
CREATE TABLE IF NOT EXISTS `t_songs`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL ,
	duration int DEFAULT 0,
	singer VARCHAR(10),
	singer_id INT,
	FOREIGN KEY(singer_id) REFERENCES brand(id)
);

INSERT INTO `t_songs` (name, duration, singer) VALUES ('温柔', 100, '五月天');
INSERT INTO `t_songs` (name, duration, singer) VALUES ('离开地球表面', 120, '五月天');
INSERT INTO `t_songs` (name, duration, singer) VALUES ('倔强', 130, '五月天');


-- 2.创建歌手表
CREATE TABLE IF NOT EXISTS `t_singer`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10),
	intro VARCHAR(200)
)

INSERT INTO `t_singer` (name, intro) VALUES ('五月天', '五月天，全亚洲代表性摇滚乐团。演出足迹踏遍美国，澳洲以及全亚洲地区.')


-- 3.修改歌曲表
-- ALTER TABLE `t_songs` CHANGE `singer` `singerId` INT;
ALTER TABLE `t_songs` DROP `singer`;
ALTER TABLE `t_songs` ADD `singer_id` INT;


-- 4.为了品牌单独创建一张表
CREATE TABLE IF NOT EXISTS `brands`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(10) UNIQUE NOT NULL,
	website VARCHAR(100),
	worldRank INT
);

INSERT INTO `brands` (name, website, worldRank) VALUES ('华为', 'www.huawei.com', 1);
INSERT INTO `brands` (name, website, worldRank) VALUES ('小米', 'www.mi.com', 10);
INSERT INTO `brands` (name, website, worldRank) VALUES ('苹果', 'www.apple.com', 5);
INSERT INTO `brands` (name, website, worldRank) VALUES ('oppo', 'www.oppo.com', 15);
INSERT INTO `brands` (name, website, worldRank) VALUES ('京东', 'www.jd.com', 3);
INSERT INTO `brands` (name, website, worldRank) VALUES ('Google', 'www.google.com', 8);


-- 5.为products表添加brand_id,并且设置外键约束
ALTER TABLE `products` ADD `brand_id` INT;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brands(id);

UPDATE `products` SET `brand_id` = 1 WHERE `brand` = '华为';
UPDATE `products` SET `brand_id` = 4 WHERE `brand` = 'OPPO';
UPDATE `products` SET `brand_id` = 3 WHERE `brand` = '苹果';
UPDATE `products` SET `brand_id` = 2 WHERE `brand` = '小米';



-- 6.在有外键约束的情况下, 修改brand中的id
UPDATE `brands` SET id = 99 WHERE id = 1;


-- 7.查看products中目前的外键
-- CREATE TABLE `products` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `brand` varchar(20) DEFAULT NULL,
--   `title` varchar(100) NOT NULL,
--   `price` double NOT NULL,
--   `score` decimal(2,1) DEFAULT NULL,
--   `voteCnt` int DEFAULT NULL,
--   `url` varchar(100) DEFAULT NULL,
--   `pid` int DEFAULT NULL,
--   `brand_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `brand_id` (`brand_id`),
--   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
SHOW CREATE TABLE `products`;
ALTER TABLE `products` DROP FOREIGN KEY products_ibfk_1;
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brands(id)
											 ON UPDATE CASCADE
											 ON DELETE CASCADE;

UPDATE `brands` SET id = 99 WHERE id = 1;


