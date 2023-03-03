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

TLS 握手过程:

-   Client hello，发过去 TLS 版本，cipher suites, 随机数，加密方法
-   Server Ack
-   Server hello,返回随机数，跟 Client 一样支持的 TLS 版本号，cipher suites,加密方法
-   Server 返回证书，server 的公钥
-   Server hello 结束
-   Client Ack
-   Client 校验 server 的证书，生成 pre-master sercret，并发给服务端
-   Server 用私钥获取 pre-master secret
-   Server 利用 pre-master secret 和 随机数 计算 master secret,
-   Client 跟服务端一样计算 master secret

    后续所有的消息通信都是用 master sercret 进行加密


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
