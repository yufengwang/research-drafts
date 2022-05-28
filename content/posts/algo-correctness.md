+++
title = "算法正确性"
author = ["wenhu"]
date = 2022-05-28T21:31:00+08:00
draft = false
+++

## 算法正确性证明 {#算法正确性证明}

算法正确：对每一个正确输入，都能得到正确的解


## 证明步骤 {#证明步骤}

1.  证明程序终止时，能获得正确的解，(部分正确）
2.  证明程序始终会终止

初始断言： 程序输入值具有的属性；结果断言： 程序输出值具有的属性

Hoare triple:  p{S}q

if p true and S terminates, q true, then S is partially correct
