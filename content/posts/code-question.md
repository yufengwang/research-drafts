+++
title = "js 常见题"
author = ["wenhu"]
date = 2022-11-29T09:50:00+08:00
tags = ["coding-question"]
draft = false
+++

## 大数相加 {#大数相加}

从右到左循环去加

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


## Debounce {#debounce}

防抖

例子：用户在 input 框输入，一段时间没有输入后，再发起网络请求

```js
function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
```


## Throttle {#throttle}

节流每隔一段时间执行一次例子： 滚动条滚动使，没必要响应每次滚动事件，每隔500ms响应一次即可

```js
function throttle(fn, time) {
  let timer;
  return function () {
    if (timer) {
      return;
    }
    let func = () => {
      fn.apply(this, arguments);
      timer = null;
    };
    timer = setTimeout(func, time);
  };
}
```
