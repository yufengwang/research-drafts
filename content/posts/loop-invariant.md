+++
title = "循环不变式"
author = ["wenhu"]
date = 2022-06-03T23:26:00+08:00
tags = ["algo-analysis"]
draft = false
+++

## Loop Invariant {#loop-invariant}

循环不变式： 循环的每次迭代中，始终为 true 的断言

\\( (P \land condition) \\{ S \\} P \\)，即 \\(P\\) 为循环不变式


### 证明循环语句正确的步骤 {#证明循环语句正确的步骤}

1.  猜测 \\(P\\)  为循环不变式
2.  证明 \\(P\\) 为循环不变式
3.  证明程序会终止
4.  证明程序终止时 \\(P \land \neg condition \\) 为 \\( T \\)
