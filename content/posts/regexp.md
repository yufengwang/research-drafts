+++
title = "正则表达式"
author = ["wenhu"]
date = 2022-06-03T16:23:00+08:00
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

-   new RegExp

-   字面量


## lookahead-lookbehind {#lookahead-lookbehind}


### Lookahead {#lookahead}

The syntax is: X(?=Y), it means "look for X, but match only if followed by Y". There may be any pattern instead of X and Y.

```js
et str = "1 turkey costs 30€";

console.log( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €
```


### Negative lookahead {#negative-lookahead}

The syntax is: X(?!Y), it means "search X, but only if not followed by Y"

```js
let str = "2 turkeys cost 60€";

console.log( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)
```

支持 capture group

```js
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
```


### Lookbehind {#lookbehind}

> Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.

Positive lookbehind: (?&lt;=Y)X, matches X, but only if there’s Y before it.

Negative lookbehind: (?&lt;!Y)X, matches X, but only if there’s no Y before it


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

    不带 g flag, 返回第一个匹配的结果

    带 g flag，返回第一个匹配，然后记录 lastIndex

-   str.match(regexp)

    不带 g flag，返回第一个匹配结果

    带 g flag，返回所有匹配结果

    没有匹配，返回 null

-   str.matchAll(regexp)

    新添加的 api，有兼容性问题

-   str.split(regexp|substr, limit)

    基于正则或子串，拆分字符串

-   str.search(regexp)

    返回第一个匹配的位置索引或 -1

-   str.replace(str|regexp, str|func)

    搜索替换，比较强大

    当第一个参数是字符串时，只会替换第一个匹配结果，用正则加 g flag，可以全量替换

-   str.replaceAll(str|regexp, str|func)

    全量搜索替换
