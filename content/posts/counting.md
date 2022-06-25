+++
title = "计数问题"
author = ["wenhu"]
date = 2022-06-05T13:38:00+08:00
categories = ["math"]
draft = false
+++

## 计数法则 {#计数法则}


### 积法则 {#积法则}

从两个不相集里选择有序对的方法数

假定任务 Task 可以分两步去解决，第一步有 \\(n\_1\\)  种解决方法，第二步有 \\(n\_2\\) 种解决方法，那么解决任务 Task 总共有  \\(n\_1 \times n\_2\\)  种方法


### 和法则 {#和法则}

从两个不相交集里选一个元素的方法数

如果任务 Task 在条件一下有 \\(n\_1\\) 种方法解决，在条件二下有 \\(n\_2\\) 种方法解决，那么在两种条件都考虑的情况下，任务 Task 共有 \\(n\_1 + n\_2\\) 种解决方法


## Permutations and Combinations {#permutations-and-combinations}

排列组合


### 排列 {#排列}

有序

n 元集里的 r 排列：

\\[ n, r \in \mathbb{Z^{+}},  1 \leq r \leq n ，P(n,r)=n(n-1)(n-2)...(n-r+1)= \frac{n!}{(n-r)!} \\]


### 组合 {#组合}

无序

n 元集里的 r 组合，表示为 \\(C(n,r)\\)，或 \\(\binom n r\\)

\\[C(n,r) = \frac{P(n,r)}{P(r,r)}=\frac{n!}{r!(n-r)!}\\]

\\[C(n,r)=C(n, n-r)\\]
