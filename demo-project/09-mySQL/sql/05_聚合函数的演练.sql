-- 1.需求: 计算华为手机的平均价格(AVG)
SELECT AVG(price) FROM `products` WHERE `brand` = '华为';

-- 2.需求: 计算华为手机的平均评分
SELECT AVG(score) as miAvgScore from `products` WHERE `brand` = '小米';

-- 3.需求: 选择手机中评分最高/最低的分数(MAX/MIN)
SELECT MAX(score) FROM `products`;
SELECT MIN(score) FROM `products`;

-- 4.需求: 所有的手机一共有多少人投过票(SUM)
SELECT SUM(voteCnt) from `products`;


-- 5.需求: 一共有多少个商品
SELECT COUNT(*) FROM `products`;
SELECT COUNT(*) FROM `products` WHERE brand = '华为';



-- 6.group by:数据根据brand进行分组
SELECT 
	brand, MAX(price) maxPrice, MIN(price) minPrice, ROUND(AVG(price),2) avgPrice, AVG(score) avgScore
FROM `products`
GROUP BY brand
HAVING avgScore > 7 AND avgPrice < 4000;






