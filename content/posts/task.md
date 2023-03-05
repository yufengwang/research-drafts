+++
title = "浏览器任务调度"
author = ["wenhu"]
date = 2022-06-29T15:54:00+08:00
tags = ["browser"]
draft = false
+++

## requestAnimationFrame {#requestanimationframe}

用于执行动画帧

既不是微任务，也不是宏任务，只是一个回调

优先级比  requestIdleCallback 高

requestAnimationFrame is a tool for us web-devs to hook in this update the rendering[^fn:1] sub-process, allowing us to draw things only when the rendering will happen, but it also has the side effect of marking the web page as animated, and thus forces browser to execute the full update the rendering steps even though it might not have been needed

在渲染前，执行回调


## requestIdleCallback {#requestidlecallback}

注册低优先级的任务

在每一帧的空闲期执行，可能不执行

有兼容性问题

不够贪婪，没法充分利用空闲时间，调用频率不够，每秒执行大概 20 次

对于 UI 渲染任务来说，在不阻塞主线程的情况下，需要尽可能的利用浏览器的空闲时间，所以 React 重新实现了自己的调度器

等 event-loop 没其他任务要处理的时候，才会被调用


## setTimeout {#settimeout}

Task

if we call the setTimeout() which is a Web API, the renderer process asks another process (perhaps the browser process) to start the timer, and when the specified time has passed, the browser process queues the callback we sent setTimeout() so that it can run on the main thread of the renderer process

指定时间间隔后，任务进到 task queue，而不是 main thread

zero delay, setTimeout(func, 0), func 在当前正在执行的脚本执行完成后执行

对浏览器而言，嵌套的定时器，出于历史原因:

after five nested timers, the interval is forced to be at least 4 milliseconds

在目前 chrome 的实现里， setTimeout 有 1ms 的最低延迟，优先级比 MessageEvents 低


## setInterval {#setinterval}

Task

指定时间间隔后，任务进到 task queue，而不是 main thread

每次调用开始计时，而不是调用结束后计时，函数两次调用的间隔 (StartB - endA) 并不是严格的 delay 时间

[^fn:1]: [update-the-rendering](https://html.spec.whatwg.org/multipage/webappapis.html#update-the-rendering)