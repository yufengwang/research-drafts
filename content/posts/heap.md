+++
title = "堆"
author = ["wenhu"]
date = 2022-06-14T23:06:00+08:00
tags = ["heap"]
draft = false
+++

## 定义 {#定义}

可以用完整二叉树表示的数组，树的每一个节点为数组中的元素

parent(i) = Math.floor(i/2)

left(i) = 2i

right(i) = 2i  + 1


### Max heap {#max-heap}

最大堆

除了根节点 A[i] &lt;= A[parent(i)]


### Min heap {#min-heap}

最小堆
