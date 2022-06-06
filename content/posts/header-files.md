+++
title = "头文件"
author = ["wenhu"]
date = 2022-06-06T21:32:00+08:00
tags = ["c/cpp"]
draft = false
+++

## 头文件 {#头文件}

用于将函数，变量声明放在同一个文件里，便于被其他文件引用

仅包含声明，不包含定义，定义在 linker 阶段链接到程序里

如下图

{{< figure src="/ox-hugo/pic.png" >}}

```c
 #include "something.h" /*当前目录下找*/
 #include <iostream> /*在系统环境里找, include directory*/
```
