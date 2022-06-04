+++
title = "指数和对数"
author = ["wenhu"]
date = 2022-06-04T15:00:00+08:00
categories = ["math"]
draft = false
+++

## 指数 {#指数}

定义： \\( b \in \mathbb{R^+}, n \in \mathbb{R^+} \\), \\(f\_b(n) = b^n = b \cdot b \cdot b \cdot ... \cdot b\\)

定理：

1.  \\(b^{x+y} = b^x \cdot b^y\\)
2.  \\((b^x)^y=b^{x \cdot y}\\)


## 对数 {#对数}

定义： \\(f = \log\_b x \\)，以 b 为底的 x 的对数值

\\(b^x = a, x = \log\_b a\\)

\\(b^{\log\_b a} = a\\)

定理：

1.  \\(\log\_b (x \cdot y)=\log\_b x + \log\_b y\\)
2.  \\(\log\_b (x^y)=y \cdot \log\_b x\\)
3.  \\(\log\_a x = \frac{\log\_b x}{\log\_b a}=\frac{1}{ \log\_b a} \cdot \log\_b x\\)，（换底，常量值乘以 b 为底的对数）

在计算机领域，\\(\log x\\)，底省略时，通常指以 2 为底的对数
