+++
title = "OAuth"
author = ["wenhu"]
date = 2022-09-27T11:08:00+08:00
tags = ["backend"]
draft = false
+++

## OAuth {#oauth}


## Role {#role}


### Client {#client}

需要获取用户权限的的三方应用，需要用户授权（主动授权，隐式静默授权）


### Resource server {#resource-server}

获取用户信息的 api 服务


### 鉴权服务 {#鉴权服务}

用于用户鉴权，通常跟 resource server 一起，也可独立拆开做鉴权服务


### Resource owner {#resource-owner}

用户，资源所有者


## 应用创建 {#应用创建}


### Redirect URI {#redirect-uri}


### Client ID {#client-id}


### Client Secret {#client-secret}

需保密，不能暴露给端


## Authorization {#authorization}

获取用户授权


### authorization code {#authorization-code}

授权码, 通常用于 web server apps 的授权, 因为 client_secret 在服务端使用，是安全的


### PKCE {#pkce}

proof key for code exchange，通常用于单页应用 single page apps, 纯 js 应用

因为 spa 无法保证 client_secret 的机密性
