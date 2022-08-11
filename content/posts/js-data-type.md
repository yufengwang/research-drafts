+++
title = "数据类型"
author = ["wenhu"]
date = 2022-07-06T14:54:00+08:00
categories = ["js"]
draft = false
+++

## Symbol {#symbol}

符号类型，跟其他语言（ruby, racket 等）里的 Symbol 不一样

表示 **唯一** 标识符，创建即唯一

可用作对象的属性 key

对象的属性 key 只能是 string 或 symbol 类型，其他类型的值会被转为 string 类型

```js
// id is a symbol with the description "id"
let id = Symbol("id");
let id1 = Symbol("id")

id !== id1
```

Symbol 不会被自动转为字符串，可以通过 toString() 方法进行转换

通常用于为第三方库的对象添加 **隐藏** 属性，而不对其他使用者造成影响

for in 遍历不会遍历 Symbol，Object.keys() 亦如是

Object.assign() 会 copy string 和 symbol 属性


### Global Symbol {#global-symbol}

name 一样，即为同一个 Symbol

```js
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true

```


### System Symbol {#system-symbol}

例如: **Symbol.iterator**


## WeakMap {#weakmap}

相比较Map 而言， WeakMap 不会阻塞垃圾收集，对内存友好


## Map {#map}

-   key 的顺序不会自动排序，始终保留其插入时的相对顺序
-   key 可以是任意数据类型


## Number {#number}


### 二进制 {#二进制}

以 0b 或 0B 开头的数字，ECMA2015 新增，有兼容性问题


### 八进制 {#八进制}

0o 或 0O 开头的数字，ECMA2015 新增，有兼容性问题

也可以直接以 0 开头，如果以 0 开头的后面的所有的数字都比 8 小，则按 8 进制解析，否则按 10 进制解析


### 十六进制 {#十六进制}

以 0x 或 0X 开头的数字

一位 16 进制数，可以用 4 位二进制数表示，例如：\\( (1110 0101)\_2 = (E5)\_{16}\\)


### BigInt {#bigint}

表示任意精度的整数，以 n 结尾，例如：123456789123456789n，0o777777777777n
