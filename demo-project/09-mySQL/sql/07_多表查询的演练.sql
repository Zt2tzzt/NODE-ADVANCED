-- 1.直接从两张表中查询数据
SELECT * FROM `products`, `brands`;

-- 2.从两张表查询所有的数据, 再对结果进行过滤
SELECT * FROM `products`, `brands` WHERE products.brand_id = brands.id;


-- 表连接
-- 1.左连接 LEFT [OUTER] JOIN '表' ON 连接条件
SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id;

-- 查询左边的数据哪些是和右边没有交集
SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id WHERE brands.id IS NOT NULL;


-- 2.右连接: RIGHT [OUTER] JOIN
SELECT * FROM `products` RIGHT JOIN `brands` ON products.brand_id = brands.id;
SELECT * FROM `products` RIGHT JOIN `brands` ON products.brand_id = brands.id WHERE products.id IS NULL;


-- 3.内连接: [CROSS/INNER] JOIN
SELECT * FROM `products` JOIN `brands` ON products.brand_id = brands.id;


-- 4.全连接: MySQL不支持全连接, 使用union
(SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id)
UNION
(SELECT * FROM `products` RIGHT JOIN `brands` ON products.brand_id = brands.id)


(SELECT * FROM `products` LEFT JOIN `brands` ON products.brand_id = brands.id WHERE brands.id IS NULL)
UNION
(SELECT * FROM `products` RIGHT JOIN `brands` ON products.brand_id = brands.id WHERE products.id IS NULL)