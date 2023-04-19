Koa 源码

Koa 导出的是一个类，名为 Application；，用它可创建出实例 app。

中间件会保存在 this.middleware 中；每一个添加的中间件，都被 push 到其中。

执行 app.listen 方法，传入的是 this.callback() 的返回值。

在 handleRequest 函数中，定义了 onerror，handleResponse，在返回的 Promise 后，.then(handleResponse).catch(onerror)

执行 next 函数，本质上是在执行 dispatch 函数。

dispatch 会返回一个 Promise

---

数据库

数据库与后端开发，就像 redux 与 react 框架的关系。

所有的开发，不管是前端，后端，大数据，人工智能...都是对数据的处理。

为什么需要数据库？

数据库是什么？

---

常见的数据库有哪些类型？

非关系型数据库，更准确的说，应该是“不仅仅是关系型数据库”

非关系型数据库，相较于关系型数据库

- 存储的形式随意简单。
- 不好进行精确地细化地操作。
- 通常会有大量冗余信息。

一般在爬取数据，或收集大量无固定结构的数据时，会使用非关系型数据库。

---

MySQL 是什么？

数据组织方式

---

下载 MySQL

下载安装版本，不用自行配置。

- 默认撞见了一个名为 root 的用户。
- 自行配置该用户的密码。

安装完成后，带开 MySQL 命令行工具。输入配置的密码，即可连接到 MySQL.

如果想要在全局命令行，使用 MySQL，配置环境变量。

---

终端连接数据库。

---

显示数据库

show databases

显示的四张表，分别代表什么意思？

information_schema 
mysql 

performance_schema 

sys

---

终端操作数据库

create database music_db 创建一个数据库

> MySQL 命令，只要不写分号，就可以换行。

---

GUI 工具介绍

在 navicat 中，连接赎救苦。

---

SQL 语句是什么？

SQL 语句分裂。

---

DDL 语句

查看当前数据库。

对数据库的创建，删除，修改

在 Navicat 中，在连接的数据库中，选择一个数据库，新建查询。

将写下的 SQL 语句，保存一个 .sql 文件；



创建数据库

创建一个已存在的数据库，会报错，使用更安全的命令。

一般使用默认编码即可。



删除数据库

删除一个不存在的数据库，会报错，使用更安全的命令。



修改数据库

可修改编码，但一般使用默认的。

