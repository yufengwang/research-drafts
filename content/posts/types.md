+++
title = "类型系统"
author = ["wenhu"]
date = 2022-12-24T22:47:00+08:00
tags = ["ts"]
draft = false
+++

## Union type {#union-type}

基于基本类型构建的新的联合类型

e.g. type C = A | B

当传值过来时，只能传满足 A 类型或 B 类型的值过来

对值的操作，需要进行 type narrow，narrow 到具体的类型后再操作，因为值可能为多种类型。除非 union 的多种类型有共性行为（有行为/属性交集）


## Intersection type {#intersection-type}

用来组合对象类型(interface)， intersection 具有被组合 member 的所有属性，对已有的 interface 进行组合，生成新的类型
