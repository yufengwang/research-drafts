+++
title = "Nest.js"
author = ["wenhu"]
date = 2022-09-20T13:22:00+08:00
tags = ["node"]
draft = false
+++

## Providers {#providers}

提供者，生产者，由 @Injectable() 装饰的类即为 provider


### 注册 {#注册}

在 @Module 里注册，由 Nest IOC runtime 去解析并做依赖注入 (DI)


## Services {#services}

可做为 provider，实现并提供具体的功能


## Controller {#controller}

消费者，使用 provider 提供的 service

处理 client 的请求，并返回响应


## DTO {#dto}

Data transfer object

定义数据传输的结构，通过 class 去定义


## Module {#module}

由 @Module 装饰的类，nest 利用 @Module 提供的元数据组织应用结构

封装 providers，不属于当前 module 或 imports 里的 provider 无法被实例化

module 不可作为 provider，（避免循环依赖）


### imports {#imports}

导出 provider 给当前 module 使用的 module


### providers {#providers}

由 nest 注入器实例化，在当前 module 内共享


### controllers {#controllers}

当前 module 需实例化的 controllers


### exports {#exports}

providers 的子集，由当前 module 提供，导出给其他 module 使用


### dynamic module {#dynamic-module}

运行时创建的 module


## Interceptor {#interceptor}


## Guards {#guards}

单一职责：控制请求是否会被对应的 route handle 处理


## Middleware {#middleware}

缺点： 不知道执行 next() 后调用哪个 handler


## Pipes {#pipes}


## Exception filters {#exception-filters}
