+++
title = "Cookie"
author = ["wenhu"]
date = 2022-06-22T14:56:00+08:00
tags = ["network", "browser"]
draft = false
+++

## 什么是 cookie {#什么是-cookie}

浏览器管理的一小段特殊字符串, http 协议的一部分，在  [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265)  里有说明


## 设置 {#设置}

1.  服务端通过 http **Set-Cookie** 响应头
2.  js 通过 **document.cookie** 设置（非 **httpOnly** 的）


### document.cookie {#document-dot-cookie}

**accessor** (getter/setter), 访问器属性

写的操作非全量覆盖，仅修改对应的字段，写的时候需要 **encodeURIComponent** ，(name, value 都要)

读的操作不展示 **domain** , **path** 等信息


## Cookie 参数 {#cookie-参数}

例如:

```js
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; domain=.foo.com; max-age=0; secure; samesite=lax; httpOnly"
```


### Path {#path}

限制 cookie 的访问路径，设置后仅当前路径及其子路径可以访问的到，一般为  **/**


### Domain {#domain}

限制不同域名对 cookie 的访问，不同二级域名是无法共享 cookie 的

子域名可以访问主域名的 cookie ，例如 **foo.site.com** 能访问 **site.com** 下设置的 cookie

历史原因， **.site.com**  跟 **site.com** 设置效果是一样的


### Expires {#expires}

过期时间, GMT 时间戳

如果没设置，浏览器关闭即删除，称之为 **session cookie**

设置了过期时间，到期后浏览器会自动删除

过期时间设为过去的时间，cookie 会被删除


### Max-age {#max-age}

从当前时间开始，多少 **秒** 后过期

设为 0 或负数，cookie 会被删除


### Secure {#secure}

仅通过 **https** 传输


### Samesite {#samesite}

用来防止 [xsrf](./csrf) (cross-site request forgery)

老的浏览器不支持 (2017年及以前的），等老浏览器都被淘汰了，xsrf 也就不需要了


#### `samesite=strict` {#samesite-strict}

跟 samesite 没给值时一样，仅当域名一致时，cookie 才会发送，较为严格


#### `samesite=lax` {#samesite-lax}

更 relax 的限制，不是那么严格

发送场景：

1.  安全的 http 请求，例如 GET
2.  顶级跳转（更改浏览器地址栏里的 url），iframe 里的跳转不行

其余的场景不会携带 cookie，例如在其他站点的表单提交，网络请求等


### HttpOnly {#httponly}

设置后， js 无法读写该 cookie


## 限制 {#限制}

1.  编码后的键值对，大小不能超过 4kb
2.  每个域名的 cookie 数为 20+，由具体浏览器限制


## 发送 {#发送}

浏览器自动带给服务器，通过 http **Cookie** 请求头


## 使用场景 {#使用场景}

用户认证，记住是谁发起的 http 请求


## 代码 {#代码}

注意：更新或删除 cookie 时，必需保持 path 和 domain 参数一致


### 读 {#读}

```js
// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```


### 写 {#写}

```js
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Example of use:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```


### 删 {#删}

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```
