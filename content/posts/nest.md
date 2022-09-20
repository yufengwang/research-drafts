+++
title = "Nest.js"
author = ["wenhu"]
date = 2022-09-20T13:22:00+08:00
tags = ["node"]
draft = false
+++

## Providers {#providers}

提供者，生产者，用 @Injectable() 装饰


### 注册 {#注册}

在 @Module 里注册，由 nest IOC runtime 去解析并做依赖注入 (DI)


## Services {#services}

可做为 provider，实现并提供具体的功能


## Controller {#controller}

消费者，使用 provider 提供的 service
