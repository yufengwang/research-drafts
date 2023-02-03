+++
title = "JavaScript 原型"
author = ["wenhu"]
date = 2022-06-03T15:50:00+08:00
tags = ["prototype"]
categories = ["js"]
draft = false
+++

## [ [Prototype] ] {#prototype}

Js 引擎层面的隐藏属性，决定继承关系，用户侧代码不可直接访问这个属性


## __proto\_\_ {#proto}

历史遗留的 getter/setter ，不建议使用，用于设置原型关系

建议使用这俩： Object.getPrototypeOf/Object.setPrototypeOf


## Class {#class}

{{< figure src="/ox-hugo/animal-rabbit-static.svg" >}}
