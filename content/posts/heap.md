+++
title = "堆"
author = ["wenhu"]
date = 2022-06-14T23:06:00+08:00
tags = ["heap"]
draft = false
+++

## 定义 {#定义}

可以用 [完整二叉树](./tree/#complete) 表示的数组，树的每一个节点为数组中的元素

Parent(i) = Math.floor(i/2)

Left(i) = 2\*i

Right(i) = 2\*i + 1


### Max heap {#max-heap}

最大堆

除了根节点 A[i] &lt;= A[parent(i)]


### Min heap {#min-heap}

最小堆

除了根节点，A[i] &gt;= A[parent(i)]

通常用来实现优先队列


## 维持堆属性 {#维持堆属性}


## 构造最大堆 {#构造最大堆}


## 堆排序 {#堆排序}
