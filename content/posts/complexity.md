+++
title = "算法复杂度"
author = ["wenhu"]
date = 2022-06-03T16:57:00+08:00
tags = ["algo-analysis"]
draft = false
+++

## Time Complexity {#time-complexity}

时间复杂度

算法执行所需的操作数，而不是实际的运行时间


### RAM {#ram}

Random Access Machine

-   单处理器
-   指令按序处理，无并发操作
-   仅包含常用指令，每个指令的执行占用常量操作时间


### Average Case {#average-case}

对 size n 的 **平均** 输入，算法执行所需的操作数，（平均运行时间）

通常要用到概率分析的方法


### Worst Case {#worst-case}

对 size n 的任意输入，算法执行所需的最大操作数，即运行时间的 **上界** (**上限**)


## Space Complexity {#space-complexity}

空间: 内存

空间复杂度：算法输入所占据的内存  + 辅助内存

Space Complexity = Auxiliary space + Space used by input values

Recursive call stack，递归调用栈也算空间占用

空间复杂度跟实现算法所使用的数据结构有关


### Auxiliary Space {#auxiliary-space}

辅助空间： 算法执行需要的额外空间
