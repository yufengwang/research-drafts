+++
title = "JavaScript 基础"
author = ["wenhu"]
date = 2023-02-02T13:58:00+08:00
categories = ["js"]
draft = false
+++

## 数据类型 {#数据类型}


### Symbol {#symbol}

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

Global Symbol

用途：全局唯一标识符

name 一样，即为同一个 Symbol

```js
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true

```

System Symbol

例如: **Symbol.iterator**


### Number {#number}

二进制

以 0b 或 0B 开头的数字，ECMA2015 新增，有兼容性问题

八进制

0o 或 0O 开头的数字，ECMA2015 新增，有兼容性问题

也可以直接以 0 开头，如果以 0 开头的后面的所有的数字都比 8 小，则按 8 进制解析，否则按 10 进制解析

十六进制

以 0x 或 0X 开头的数字

一位 16 进制数，可以用 4 位二进制数表示，例如：\\( (1110 0101)\_2 = (E5)\_{16}\\)

BigInt

表示任意精度的整数，以 n 结尾，例如：123456789123456789n，0o777777777777n


### WeakMap[^fn:1] {#weakmap}

相比较Map 而言， WeakMap 不会阻塞垃圾收集，对内存友好

key 必须是对象，用于给对象添加额外的数据，当对象无引用时，添加的额外数据也应该同步被删掉

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
// weakMap 为空

// 若为 Map， Map 不会为空
```


### Map {#map}

-   key 的顺序不会自动排序，始终保留其插入时的相对顺序
-   key 可以是任意数据类型


### WeakSet {#weakset}

只能向其中添加对象，而不是原始值

WeakMap 和 WeakSet 都不支持迭代，不支持获取当前的所有值

be an “additional” storage of data for objects which are stored/managed at another place


### Proxy [^fn:1] {#proxy}

proxy 是一个特殊的对象，(a transparent wrapper around target)

用于拦截对已有对象的访问和操作

internal method

引擎层面的实现，仅在 specification 中使用，无法在 js 中直接调用的方法

proxy trap

拦截引擎 (e.g. v8) 层面对 internal method 的调用

示例

| internal method         | handler        | triggers when          |
|-------------------------|----------------|------------------------|
| [ [Get] ]               | get            | 读属性                 |
| [ [DefineOwnProperty] ] | defineProperty | Object.defineProperty  |
| [ [OwnPropertyKeys ] ]  | ownKeys        | for..in, Object.keys 等 |

```js
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  /**
   * target  被代理的对象
   * prop  被访问的属性
   * receiver 仅在访问 getter 属性时候用到
   */
  get(target, prop, receiver?) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

console.log( numbers[1] ); // 1
console.log( numbers[123] ); // 0 (no such item)

```


### Reflect {#reflect}

minimal wrappers around internal methods

每一个被 proxy 代理的内部方法，都有一个对应的 Reflect 方法，跟 proxy trap 一样的名字和参数

用于简化转发操作，简化 proxy handler 的写法，跟 Proxy 配合使用

示例

| Operation         | Reflect Call                  | internal method |
|-------------------|-------------------------------|-----------------|
| obj[prop]         | Reflect.get(obj, prop)        | [ [Get] ]       |
| obj[prop] = value | Reflect.set(obj, prop, value) | [ [Set] ]       |

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

console.log(admin.name); // Admin
```

限制

Proxy 不能代理其没有的 slot，例如 Map 的 [ [ MapData ] ], private class fields, \\(===\\) 操作符等

e.g.

```js
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // Error
```

Fix:

```js
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)

```

Array has no internal slots, for historical reasons


## Var {#var}

only a variable's declaration is hoisted, not its initialization

var declarations are processed when the function starts (or script starts for globals)

var 的变量声明会被提升，变量赋值及初始化不会

var 没有块级作用域，只有函数和全局作用域

without use strict, an assignment to a non-existing variable creates a new global variable


## Lexical Environment[^fn:1] {#lexical-environment}

运行中的函数，代码块，脚本全局都有与之对应的 LE

词法环境对象，包括两部分:

1.  Environment Record 环境记录对象，保存局部变量，this 信息
2.  指向外层词法环境的指针

A variable is a property of a special internal object, associated with the currently executing block/function/script

执行上下文分全局上下文、函数上下文和块级上下文

代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数。


## Function {#function}

函数声明会在词法环境创建时，立刻初始化，所以我们可以在函数声明前调用函数

函数表达式不会

```js
// 函数声明
function foo() {}

// 函数表达式
let a = function () {}
```

函数在每次调用时，都会创建一个与之关联的 LE

参数，局部变量，都是 ER 的一个属性


### 闭包 {#闭包}

闭包即函数，能记住其外层作用域变量并使用

每个函数都有个隐藏的 [ [Environment] ] 属性，指向其被创建的词法环境


### 箭头函数 {#箭头函数}

this 为外层词法环境的 this，不能被 new，没有 arguments, 没有 super


## Prototype {#prototype}


### [ [Prototype] ] {#prototype}

Js 引擎层面的隐藏属性，决定继承关系，用户侧代码不可直接访问这个属性


### __proto\_\_ {#proto}

历史遗留的 getter/setter ，不建议使用，用于设置原型关系

建议使用这俩： Object.getPrototypeOf/Object.setPrototypeOf


## Class {#class}

```js
class Rabbit extends Animal {}
```

{{< figure src="/ox-hugo/animal-rabbit-static.svg" >}}


## 值比较 {#值比较}

-   `=`

    isStrictlyEqual 算法

    不会做类型转换,

-   ==
    isLooselyEqual 算法

    比较值时会做类型转换

-   Object.is

-   SameValue 算法

    判断两个值是否一样，跟 `=` 一致，除了(NaN, +0, -0) 的比较
    ```js
    console.log(Object.is('1', 1));
    // Expected output: false

    console.log(Object.is(NaN, NaN));
    // Expected output: true

    console.log(Object.is(-0, 0));
    // Expected output: false

    const obj = {};
    console.log(Object.is(obj, {}));
    // Expected output: false

    ```

-   SameValueZero
    ```js

    function sameValueZero(x, y) {
      if (typeof x === "number" && typeof y === "number") {
        // x and y are equal (may be -0 and 0) or they are both NaN
        return x === y || (x !== x && y !== y);
      }
      return x === y;
    }

    ```


## JS 语句 {#js-语句}


### for..in {#for-dot-dot-in}

可枚举属性，包括原型链上的继承属性


### for..of {#for-dot-dot-of}

枚举 iterable


### Object.keys {#object-dot-keys}

自有可枚举属性


## 常用 API {#常用-api}


### call &amp; apply {#call-and-apply}

```js
func.apply(this, ['eat', 'bananas']) vs. func.call(this, 'eat', 'bananas')

```


## 垃圾收集[^fn:2] {#垃圾收集}


### 标记清除 {#标记清除}

Reachability:

当对象有指向其的引用，当前对象是不是能垃圾回收的

roots:

-   当前正在执行的函数，其局部变量和参数
-   当前调用链上的其他函数
-   全局变量

    > Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

从 roots 开始打标记，沿 root 的引用链继续打标记，没有被打上标记的对象会被 GC 掉

引擎层面的优化


### 引用计数 {#引用计数}


### generational garbage collection {#generational-garbage-collection}


## 模块化 {#模块化}

-   IIFE

-   AMD

Asynchronous Module Definition
依赖前置、提前执行

-   CMD

Common Module Definition
依赖就近、延迟执行

-   UMD

Universal Module Definition

-   CommonJS
    缩写为 CJS, Node.js 的模块规范

-   ESM

    语言层面的规范

CommonJS 的 require() 机制是完全同步的，而 ECMAScript module 的 import 机制则是异步的

[^fn:1]: [lexical-environment](https://javascript.info/closure)
[^fn:2]: [garbage-collection](https://javascript.info/garbage-collection)