+++
title = "Koa"
author = ["wenhu"]
date = 2023-02-19T12:00:00+08:00
tags = ["node"]
draft = false
+++

## API {#api}


### Request {#request}

Koa Request 是 Node 原始 request 对象的抽象，提供额外的功能用于 http 服务的开发

api 有：

-   request.method
-   request.query
    ...


### Response {#response}

Koa Response 是 Node 原始 response 对象的抽象，提供额外的功能用于 http 服务的开发

api 有:

-   response.header
-   response.headers
-   response.get()
    ...


### Context {#context}

封装 node 的 request 和 response 对象到一个对象中，提供额外的辅助方法便于应用开发

每个 http 请求都会创建一个 context 对象

```js
app.use(async ctx => {
  ctx; // is the Context
  ctx.request; // is a Koa Request
  ctx.response; // is a Koa Response
  ctx.req // Node's request object.
  ctx.res // Node's response object.
});

```

不要使用下面的 node response 方法，绕过 koa 的响应处理

-   res.statusCode
-   res.writeHead()
-   res.write()
-   res.end()


## 中间件 {#中间件}

洋葱圈模型

{{< figure src="/ox-hugo/koa.png" >}}

```js
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  ctx.body = 'hello'
});
```


### koa-compose {#koa-compose}

```js
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


```


## 异常处理 {#异常处理}
