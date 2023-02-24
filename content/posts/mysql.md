+++
title = "Mysql"
author = ["wenhu"]
date = 2022-06-03T23:58:00+08:00
tags = ["database"]
draft = false
+++

## 表设计 {#表设计}


## KEY, INDEX {#key-index}

KEY, INDEX，是同义词，避免全表扫描，提高数据检索速度


## PRIMARY, UNIQUE {#primary-unique}

用来确保数据的唯一性（插入或更新时），即不能有两行一样的数据（某一列或几列一致），即列或组合列的值要唯一

unique index: 唯一索引， 可以有多个唯一索引, 可以用在空(NULL)列上

primary key: 主键，一个表最多只有一个主键，是唯一索引的特殊形式，用于唯一标识表里的某一行数据，只能用在非空列上


## Table Name {#table-name}

Mysql 表名 数据库名大小写不敏感，在存储和查找时都会被转为小写


## 保留字 {#保留字}

用保留字做表名或列名时，加 backticks

e.g.

```sql
ADD COLUMN `name` VARCHAR(191) NOT NULL
```


## Foreign key {#foreign-key}

在 Relation 的一侧存储.


## Relation {#relation}
