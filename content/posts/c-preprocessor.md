+++
title = "C 预处理器"
author = ["wenhu"]
date = 2022-06-05T20:34:00+08:00
tags = ["c/cpp"]
draft = false
+++

## 预处理 {#预处理}

C: C 或 C++

程序编译前的转换过程，不修改源文件，仅在内存中完成转换

preprocessor 不理解 C 的语法

[参考](https://www.learncpp.com/cpp-tutorial/introduction-to-the-preprocessor/)


## 预处理指令 {#预处理指令}

以 `#symbol` 开头（symbol为指令字符），以换行符结尾;

常用指令

| 指令                           | 含义   |
|------------------------------|------|
| `#include`                     | 引入头文件 |
| `#define`                      | 宏定义 |
| `#ifdef`, `#ifndef`, `#endif`. | 条件编译指令 |


### Object-like Macros {#object-like-macros}

类对象宏

```c
#define PRINT_JOE /* 用于条件编译 */
#define MY_NAME "Alex" /* 用于常量定义, 老代码里用到 */
```
