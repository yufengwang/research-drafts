+++
title = "数论"
author = ["wenhu"]
date = 2022-05-28T20:36:00+08:00
tags = ["number-theory"]
categories = ["math"]
draft = false
+++

## 整除 {#整除}

\\(a \ | \  b\\)： 即如果  \\(a, b, c \in \mathbb{Z}, a \neq 0, \exists c(ac = b)\\) ，则说明 a 能整除 b，a 为 b 的因子或除数;

反之，若 \\(\nexists c\\)，则 \\( a \nmid b\\)，即 a 不能整除 b


## Division Algorithm {#division-algorithm}

假设 \\(a \in \mathbb{Z}, d \in \mathbb{Z^+}\\) ， 存在唯一的 \\( q, r \in \mathbb{Z} ,  0 \leq r < d \\)， 使 \\( a = dq + r\\)

d 为除数，a 为被除数，q 为商，r 为余数

q =  a **div** d ， r = a **mod** d


## 模运算 {#模运算}

定理：如果 \\(a, b \in \mathbb{Z}, m \in \mathbb{Z^+}，m \mid (a - b)  \\)，则 a, b 对 m 同余，简写为 \\( a \equiv b \pmod m \\)

即 a **mod** m = b **mod** m ，m 为模数

定理：a，b 同余时，\\( \exists k \in \mathbb{Z}， a = b + km \\)
