-- 对数据库进行操作:
-- 1.查看当前所有的数据库
SHOW DATABASES;

-- 2.使用某一个数据库
USE music_db;


-- 3.查看目前哪一个数据是选中(正在使用的数据)
SELECT DATABASE();

-- 4.创建一个新的数据库
-- CREATE DATABASE test_demo;
CREATE DATABASE IF NOT EXISTS test_demo;

-- 5.删除某一个数据库
DROP DATABASE IF EXISTS test_demo;

-- 6.修改数据库(了解, 自己演练)
