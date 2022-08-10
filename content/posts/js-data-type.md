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
