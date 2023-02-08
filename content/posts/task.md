+++
title = "浏览器任务调度"
author = ["wenhu"]
date = 2022-06-29T15:54:00+08:00
tags = ["browser"]
draft = false
+++

## requestAnimationFrame {#requestanimationframe}

注册高优先级的任务


## requestIdleCallback {#requestidlecallback}

注册低优先级的任务

在每一帧的空闲期执行，可能不执行


## setTimeout {#settimeout}

if we call the setTimeout() which is a Web API, the renderer process asks another process (perhaps the browser process) to start the timer, and when the specified time has passed, the browser process queues the callback we sent setTimeout() so that it can run on the main thread of the renderer process

指定时间间隔后，任务进到 task queue，而不是 main thread

zero delay, setTimeout(func, 0), func 在当前正在执行的脚本执行完成后执行

对浏览器而言，嵌套的定时器，出于历史原因:

after five nested timers, the interval is forced to be at least 4 milliseconds


## setInterval {#setinterval}

指定时间间隔后，任务进到 task queue，而不是 main thread

每次调用开始计时，而不是调用结束后计时，函数两次调用的间隔 (StartB - endA) 并不是严格的 delay 时间
