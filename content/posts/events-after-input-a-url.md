+++
title = "在浏览器地址栏输入 url 会发生什么"
author = ["wenhu"]
date = 2022-05-28T21:26:00+08:00
draft = false
+++

## 浏览器通过 DNS 查询域名对应的 ip 地址 {#浏览器通过-dns-查询域名对应的-ip-地址}

1.  检查浏览器 cache

2.  检查操作系统 cache

3.  检查路由 cache

4.  检查 isp cache

5.  如果前面四步都没找到，ISP 的 DNS 服务器会向其他 DNS 服务器请求该域名对应的 ip 地址


## 浏览器跟该 ip 地址的 server 建立 tcp 连接 {#浏览器跟该-ip-地址的-server-建立-tcp-连接}

3 次握手


## 浏览器向该 ip 地址的 server 发起 http 请求 {#浏览器向该-ip-地址的-server-发起-http-请求}


## server 处理请求并返回 http 响应 {#server-处理请求并返回-http-响应}

1\*\*，information

2\*\*，ok

3\*\*, 重定向

4\*\*，客户端错误

5\*\*，服务器错误


## 浏览器开始渲染 html {#浏览器开始渲染-html}


### 构建 dom 树 {#构建-dom-树}

js 的加载会阻塞 dom 树的构建, css, images 不会。css 会阻塞页面渲染

| 事件             | 含义                |
|----------------|-------------------|
| window.onload    | 所有静态资源加载完毕 |
| DOMContentLoaded | dom 构建完毕，cssom 构建完毕 |


## 构建 cssom {#构建-cssom}


### 构建 render 树 {#构建-render-树}

dom + cssom = render tree，移除不显示到屏幕上的节点


### 布局 (layout) {#布局--layout}

计算 render tree 里每一个节点的位置，尺寸等


### 绘制 (paint) {#绘制--paint}


## 浏览器请求 html 里依赖的资源（images，css，javascript） {#浏览器请求-html-里依赖的资源-images-css-javascript}

|       | 执行顺序   | 是否阻塞页面渲染 | 适用场景               |
|-------|--------|----------|--------------------|
| async | 谁先加载完谁先执行 | 否       | 独立第三方脚本，广告等。执行顺序无关联的脚本 |
| defer | 谁的位置靠前谁先执行 | 否       | 依赖 dom 的脚本，依赖执行顺序的脚本 |


## 页面加载完成后，如果有其他的异步请求（xhr，fetch），浏览器会再次发起请求 {#页面加载完成后-如果有其他的异步请求-xhr-fetch-浏览器会再次发起请求}
