+++
title = "组件化"
author = ["wenhu"]
date = 2022-07-17T22:04:00+08:00
tags = ["frontend"]
draft = false
+++

## 什么是组件 {#什么是组件}

任何可被共享的函数，库，ui 等，都可称之为组件

一切皆组件: 中间件，service，controller，module，hook 等都可统称为组件，不仅仅局限于前端


## Why {#why}

一致性

避免重复工作，提效

新人友好


## 中心化 {#中心化}

中心化的组件仓库，所见即所得，single source of truth


## 去中心化 {#去中心化}

去中心化开发，可在任意代码仓库里向中心化组件仓库贡献组件


## 版本控制 {#版本控制}

类似 git


## Tag {#tag}

semver


## 快照 {#快照}

能快速针对某个状态的组件进行记录，方便调试


## 生产者 {#生产者}

被依赖方，组件的生产者，开发者，维护者


## 消费者 {#消费者}

消费并使用组件，依赖方


## Bit {#bit}

component-driven architecture


### Apps {#apps}

可被部署的组件，可作为独立的后端或前端应用，或作为运行时，微服务，微前端，serverless function 等被其他 app 消费

apps 为独立的，包含其所有构建，部署等所需要的信息


### Aspect {#aspect}

Service，使用 Aspect environment

用来拓展 bit 功能的组件,也可用来构建用户的可组合应用


### Workspaces {#workspaces}

一系列的文件和目录，提供组件组合和版本控制的必要上下文

组件打了版本并导出到 scope 后，会跟 workspace 解耦


### Scope {#scope}

组件协作的 server， 从本地 workspace 导出组件，远端存储，然后跟其他人写作，类似 git

组件从 scope export 和 import


### Env {#env}

开发环境, 工具，生产者及其配置，用于组件开发，包括组件文档，编译，测试，构建等
