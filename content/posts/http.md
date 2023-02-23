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


### 状态码 {#状态码}

-   301

    Moved Permanently

    代表资源的永久重定向

-   302

    Found

    代表资源的临时重定向

-   304

    Not Modified


### 请求方法 {#请求方法}

-   Post

    新建资源

-   Put

    更新资源


## HTTP 2.0 {#http-2-dot-0}

TCP 多路复用


## HTTPS {#https}

{{< figure src="/ox-hugo/https.png" >}}


## 浏览器网络请求 {#浏览器网络请求}


### fetch {#fetch}

选项参数

-   mode

    cors:

    no-cors: only allows a limited set of headers in the request

    Accept
    Accept-Language
    Content-Language
    Content-Type with a value of application/x-www-form-urlencoded, multipart/form-data, or text/plain


### XMLHttpRequest {#xmlhttprequest}
