+++
title = "控制反转"
author = ["wenhu"]
date = 2022-08-10T10:44:00+08:00
categories = ["js"]
draft = false
+++

## IOC {#ioc}

inversion of control，控制反转

由 frammework 去控制代码的执行，实例化逻辑，而不是用户代码去控制

Do not call us, we call you


## DI {#di}

dependency injection，依赖注入

依赖类跟其依赖 **解耦** ，利于测试和代码复用


### 实现方式 {#实现方式}

1.  Constructor injection
2.  Interface injection
3.  Setter injection

依赖抽象的接口，而不是具体的实现


### ts/js 如何实现？ {#ts-js-如何实现}
