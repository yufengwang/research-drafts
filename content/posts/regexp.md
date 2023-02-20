+++
title = "正则表达式"
author = ["wenhu"]
date = 2022-06-03T16:23:00+08:00
tags = ["regexp"]
categories = ["js"]
draft = false
+++

## Character Class {#character-class}

字符类

| 字符 | 含义                             |
|----|--------------------------------|
| `\d` | 数字                             |
| `\D` | 非数字                           |
| `\s` | 空格，换行符，制表符             |
| `\S` | 非 \s                            |
| `\w` | 拉丁字母，数字，下划线 _         |
| `\W` | 非 \w                            |
| `.`  | 除 \n 外的任意字符; 如果有 `s` flag，则为任意字符 |


## Quantifiers {#quantifiers}

量词，用于针对其前面的字符的数量的修饰

| 字符  | 含义                    |
|-----|-----------------------|
| `{n}` | n个                     |
| `+`   | 1或多，[1, +\\(\infty\\) ) |
| `*`   | 0或多，[0, +\\(\infty\\) ) |
| `?`   | 0或1，{0, 1}            |


## 创建正则 {#创建正则}

-   new regexp
-   字面量


## 相关 API {#相关-api}

-   regexp.test(str)

    在字符串里找匹配，返回布尔值

    带 g flag 的话会记住 lastIndex
    ```js
      let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

      alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
      alert( regexp.test("javascript") ); // false
    ```

<!--listend-->

-   regexp.exec(str)
-   str.match(regexp)
-   str.matchAll(regexp)
-   str.split(regexp|substr, limit)
-   str.search(regexp)
-   str.replace(str|regexp, str|func)
