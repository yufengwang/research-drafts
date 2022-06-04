+++
title = "归纳和递归"
author = ["wenhu"]
date = 2022-06-01T23:38:00+08:00
tags = ["induction", "recursion"]
categories = ["math"]
draft = false
+++

## 数学归纳和递归 {#数学归纳和递归}


### 数学归纳 {#数学归纳}

证明：当 \\( n \in \mathbb{Z^+} \\) 时，\\(P(n)\\) 成立。

基础条件： 证明 \\(P(1)\\) 成立

归纳条件： 证明对 \\(\forall k \in \mathbb{Z^+}  \\)， \\(P(k) \rightarrow P(k+1) \\) 成立

即可证原命题成立

推理公式： \\( (P(1) \land \forall k (P(k) \rightarrow P(k+1))) \rightarrow \forall n P(n)  \\)，\\(n,k \in \mathbb{Z^+}\\)


### 递归 {#递归}
