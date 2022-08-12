+++
title = "装饰器"
author = ["wenhu"]
date = 2022-08-12T14:59:00+08:00
categories = ["js"]
draft = false
+++

## 作用 {#作用}

用于标注或修改类和类的成员， ts decorator[^fn:1]，js decorator[^fn:2]

可作用于： 类声明，方法，访问器，属性，参数


## 组合 {#组合}

多 decorator 组合时，调用顺序为

1.  decorator 表达式的执行自上而下
2.  decorator 表达式的执行结果作为函数，从下往上按序作用于被装饰的元素


## 执行顺序 {#执行顺序}

1.  实例成员
    1.  参数
    2.  方法
    3.  访问器
    4.  属性
2.  静态成员
    1.  参数
    2.  方法
    3.  访问器
    4.  属性
3.  constructor
    1.  参数
4.  类

[^fn:1]: [ ts decorator](https://www.typescriptlang.org/docs/handbook/decorators.html#introduction)
[^fn:2]: [js decorator](https://javascript.info/call-apply-decorators)
