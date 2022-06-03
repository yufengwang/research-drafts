+++
title = "缓存"
author = ["wenhu"]
date = 2022-06-01T00:03:00+08:00
tags = ["network", "cache"]
draft = false
+++

## 缓存 {#缓存}


### 为什么需要缓存 {#为什么需要缓存}

-   减少不必要的网络请求，提升页面访问速度
-   减少服务器负载
-   节省网络开销(流量)


### 缓存工作机制 {#缓存工作机制}

通过 http 请求头及 http 响应头来控制


### 缓存相关 http header {#缓存相关-http-header}


#### Expires {#expires}

Fri, 30 Oct 1998 14:19:41 GMT，优先级较低

**服务端返回** ，GMT 时间戳。告诉浏览器在指定的时间戳之后重新获取新的资源。限制：服务器跟浏览器的时间必须保持同步


#### Cache-Control {#cache-control}

Max-age = 3153000 单位秒

| private  | 仅允许浏览器缓存 |
|----------|----------|
| public   | 可被任意节点缓存 |
| no-cache | 每次都需要验证缓存的有效性 |
| no-store | 不允许被缓存  |

**服务端返回**


#### Last-Modified {#last-modified}

Mon, 03 Jan 2011 17:45:57 GMT

**服务端返回** ，用来重新校验缓存是否有效, GMT 时间戳


#### ETag {#etag}

e.g. ETag: x234dff

**服务端返回** ，当浏览器端某个缓存过期，浏览器会发送一段 token（通常是文件的 hash 值）来请求服务器判断该文件是否过期。如果 ETag 不变，则继续使用缓存


#### If-None-Match {#if-none-match}

If-None-Match: x234dff

**浏览器端发送** ，检查此值是否跟 server 端的 ETag 值匹配


#### If-Modified-Since {#if-modified-since}

Mon, 03 Jan 2011 17:45:57 GMT

**浏览器端发送**
