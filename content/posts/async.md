+++
title = "异步"
author = ["wenhu"]
date = 2022-06-03T15:45:00+08:00
tags = ["async", "js"]
draft = false
+++

**草稿，待完善**


## 同步 {#同步}

run to completion


## 异步 {#异步}


### Reactor Pattern {#reactor-pattern}


### 异步的底层原理 {#异步的底层原理}

操作系统的 api


### Callback {#callback}


### Generator {#generator}


### Promise {#promise}


### Async/Await {#async-await}


### Observable {#observable}


### IO {#io}

网络请求，文件读写

同步io：应用初始化的时候读配置文件用，否则不建议使用同步 io，阻塞 eventloop，影响性能


### queueMicrotask {#queuemicrotask}

ecma-262 标准方法，用于注册微任务


### process.nextTick {#process-dot-nexttick}

任务队列，被 node 管理，仅在 node 环境支持

优先级高于微任务


### 并发 {#并发}


### 并行 {#并行}


### Worker Threads {#worker-threads}


### setImmediate {#setimmediate}

非标准方法，不推荐使用，仅在 node 环境支持

宏任务，在 poll phase 阶段后执行


### Event Loop {#event-loop}

等待任务，执行任务，继续等待任务（等待期基本不消耗 cpu 资源）

node 环境跟 browser 环境的 event loop 表现不一致


#### Browser event loop {#browser-event-loop}

使用 libevent 来实现，单队列

{{< figure src="/ox-hugo/eventloop.svg" >}}


#### Node event loop {#node-event-loop}

多阶段，每阶段一个队列使用 libuv 来实现分不同的阶段 phase，每个阶段可以理解成一个队列
Node 11.0.0 修复了微任务的 bug
四个 phase (队列）
expired timer callbacks
i/o events
immediate queues
close handler
中间队列
process.nextTick/promise 微任务

{{< figure src="/ox-hugo/eventloop-node.png" >}}


#### Event Loop 最佳实践 {#event-loop-最佳实践}


#### 事件的区别 {#事件的区别}

浏览器事件：用户交互，脚本加载等，服务端事件：文件 i/o，网络 i/o，

| 环境 | browser  | node  |
|----|----------|-------|
| --- | ---      | ---   |
| 实现库 | libevent | libuv |


### libuv {#libuv}

Network I/O is not performed on the libuv thread pool

File I/O在 libuv thread pool 里执行

dns.lookup() 在 libuv 线程池里执行

{{< figure src="/ox-hugo/libuv.png" >}}


### libuv 线程池 {#libuv-线程池}


### 微任务 {#微任务}

v8 术语，由引擎管理的任务队列

.then/.catch/.finally  queueMicrotask 注册的均为微任务

当前宏任务执行完后，引擎会执行微任务，优先级高于宏任务


### 宏任务 {#宏任务}

v8 术语

例如：脚本加载事件，页面交互事件

执行宏任务时，浏览器不会渲染


### Node架构 {#node架构}

{{< figure src="/ox-hugo/node-arch.png" >}}


### 参考 {#参考}

1.  <https://stackoverflow.com/questions/55467033/difference-between-process-nexttick-and-queuemicrotask>
2.  <https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810>
3.  <https://gist.github.com/deepal?page=1>
