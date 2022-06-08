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


### Arithmetic Modulo {#arithmetic-modulo}

算术模运算

\\(a \cdot \_m b = (a \cdot b)\mod m\\)

\\(a + \_m b = (a + b)\mod m\\)


### Fast Modulo Exponentiation {#fast-modulo-exponentiation}


## 质数 {#质数}

质数又称之为素数

只能被 **1** 和 **其自身** **整除的** **大于 1** 的整数，反之称为 **合数**

定理1： 任何一个大于 1 的整数，可以唯一的表示为一个质数或多个（ \\([2, +\infty)\\) ）质数的积，质因数按增序书写


### Relatively Prime {#relatively-prime}


## Greatest Common Divisor {#greatest-common-divisor}

最大公约数：能 **整除** 两个整数的 **最大** 整数，表示为 \\(gcd(a,b)\\)


## Least Common Multiple {#least-common-multiple}

最小公倍数
