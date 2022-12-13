+++
title = "js 常见题"
author = ["wenhu"]
date = 2022-11-29T09:50:00+08:00
tags = ["interview"]
categories = ["js"]
draft = false
+++

## 大数相加 {#大数相加}


### 思想 {#思想}


### 代码实现 {#代码实现}

```js

/**
 * js 大数相加
 * 字符串拼接，用加法法则计算
 * @param { string } a
 * @param { string } b
 * @returns string
 */
function sumBigNumber(a, b) {
  let res = "",
    temp = 0;

  /** @type {string[]} */
  const arrA = a.split("");
  /** @type {string[]} */
  const arrB = b.split("");

  while (arrA.length || arrB.length || temp) {
    // ~~ 将操作数转换成 int
    temp += ~~arrA.pop() + ~~arrB.pop();
    res = (temp % 10) + res;
    temp = temp > 9 ? 1 : 0;
  }

  // 删掉头部的 0
  return res.replace(/^0+/, "");
}

```
