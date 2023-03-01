+++
title = "小程序相关"
author = ["wenhu"]
date = 2023-02-26T13:43:00+08:00
tags = ["frontend"]
draft = false
+++

## 架构 {#架构}

{{< figure src="/ox-hugo/miniapp.png" >}}

渲染层的界面使用 webview 进行渲染；逻辑层采用 JSCore运行JavaScript代码

无论是线程之间的通讯、数据的传递、网络请求都由Native层做转发


## 框架 {#框架}


### Taro {#taro}

为了统一跨平台的开发方式，通过运行时框架、组件、API 去抹平多端差异


## 跨端 {#跨端}
