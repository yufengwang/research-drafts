+++
title = "类型系统"
author = ["wenhu"]
date = 2022-12-24T22:47:00+08:00
tags = ["typescript"]
draft = false
+++

## Union type {#union-type}

基于基本类型构建的新的联合类型

e.g. type C = A | B

传值时: 只能传满足 A 类型或 B 类型的值过来

对值的操作时: 需要进行 type narrow，narrow 到具体的类型后再操作，因为值可能为多种类型。除非 union 的多种类型有共性行为（有行为/属性交集）


## Intersection type {#intersection-type}

用来组合对象类型(interface)， intersection 具有被组合 member 的所有属性，对已有的 interface 进行组合，生成新的类型


## 其他类型 {#其他类型}


### unknown {#unknown}

unkown 类型值上不允许任何操作


### any {#any}

any 类型值上允许任何操作，为所欲为


### never {#never}

函数抛异常，或者终止程序的执行


### void {#void}

函数无明确返回值类型


## Type 和 Interface {#type-和-interface}

-   interface 可以通过 extends 关键字实现继承, type 通过 &amp; 实现继承
    ```typescript
    interface Animal {
      name: string
    }

    interface Bear extends Animal {
      honey: boolean
    }

    const bear = getBear()
    bear.name
    bear.honey

    ```

    ```typescript
    type Animal = {
      name: string
    }

    type Bear = Animal & {
      honey: boolean
    }

    const bear = getBear();
    bear.name;
    bear.honey;

    ```

-   interface 可被重复声明，用于添加新属性, type 创建后不能再重复声明

    也就是说 type alias 不能用于声明合并
    ```typescript
    interface Window {
      title: string
    }

    interface Window {
      ts: TypeScriptAPI
    }

    const src = 'const a = "Hello World"';
    window.ts.transpileModule(src, {});

    ```

<!--listend-->

```typescript
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
```

-   interface 只能用于描述对象，type 可以用来表示任何类型
