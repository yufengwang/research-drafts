+++
title = "HTTP"
author = ["wenhu"]
date = 2022-06-01T00:03:00+08:00
tags = ["network"]
draft = false
+++

## HTTP 1.1 {#http-1-dot-1}

缺点：

队首阻塞、浏览器并发请求数限制

即使是为了请求一个非常少的数据，也可能需要完整经历：建立 TCP 连接 =&gt; 发送 HTTP 请求 =&gt; 服务端处理 =&gt; 返回响应数据整个过程


## HTTP 2.0 {#http-2-dot-0}

TCP 多路复用


## HTTPS {#https}
