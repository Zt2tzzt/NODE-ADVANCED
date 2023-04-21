-- 1.多对多关系
-- 1.1. 创建学生表
CREATE TABLE IF NOT EXISTS `students`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT
);
INSERT INTO `students` (name, age) VALUES('why', 18);
INSERT INTO `students` (name, age) VALUES('tom', 22);
INSERT INTO `students` (name, age) VALUES('lilei', 25);
INSERT INTO `students` (name, age) VALUES('lucy', 16);
INSERT INTO `students` (name, age) VALUES('lily', 20);



-- 1.2. 创建课程表
CREATE TABLE IF NOT EXISTS `courses`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    price DOUBLE NOT NULL
);

INSERT INTO `courses` (name, price) VALUES ('英语', 100);
INSERT INTO `courses` (name, price) VALUES ('语文', 666);
INSERT INTO `courses` (name, price) VALUES ('数学', 888);
INSERT INTO `courses` (name, price) VALUES ('历史', 80);
INSERT INTO `courses` (name, price) VALUES ('物理', 100);


-- 1.3. 创建学生选择的课程关系表
CREATE TABLE IF NOT EXISTS `students_select_courses`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE ON DELETE CASCADE
);



-- 2.选择的过程
# why 选修了 英文和数学
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 1);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 3);

# lilei选修了 语文和数学和历史
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 2);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 3);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 4);



-- 3.查询数据
-- 3.1. 所有有选课学生的选课情况(内连接)
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
JOIN `courses` cs ON ssc.course_id = cs.id;

-- 3.2.所有的学生（不管有没有选课）的选课情况
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id;



-- 3.3.单个学生的选课情况(why的选课情况)
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.name = 'why';

-- 3.4.单个学生的选课情况(lily的选课情况)
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.name = 'lily';


-- 3.5.查看哪些学生没有选择课程
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE cs.id IS NULL;

-- 3.6.查看哪些课程没有被选择
SELECT
	stu.name stuName, stu.age stuAge, cs.name csName, cs.price csPrice
FROM `students` stu
RIGHT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
RIGHT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.id IS NULL;