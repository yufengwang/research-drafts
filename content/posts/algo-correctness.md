+++
author = ["wenhu"]
draft = false
+++

## Algorithm correctness {#algorithm-correctness}

算法正确性证明

算法正确：对每一个正确输入，都能得到正确的解


### 证明步骤 {#证明步骤}

1.  程序终止时，能获得正确的解，（部分正确）
2.  程序始终会终止

初始断言： 程序输入值具有的属性结果断言： 程序输出值具有的属性

Hoare triple:  p{S}q

if p true and S terminates, q true, then S is partially correct
