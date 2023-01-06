+++
title = "Browser"
author = ["wenhu"]
date = 2022-06-29T15:54:00+08:00
tags = ["browser"]
draft = false
+++

## Render Pipeline {#render-pipeline}

JS -&gt; style -&gt; layout -&gt; paint -&gt; composite


### Layout {#layout}

计算元素的尺寸，位置，更改 width, height, position 等属性会 relayout


### Paint {#paint}

绘制像素，更改 box-shadow, background-color, text-color 等属性会 repaint


## 任务调度 {#任务调度}


### requestAnimationFrame {#requestanimationframe}

注册高优先级的任务

1.  通过事件监听器注册的回调将会在同一帧中执行
2.  通过 raf 注册的回调将在下一帧中执行


### requestIdleCallback {#requestidlecallback}

注册低优先级的任务在每一帧的空闲期执行，可能不执行


### setTimeout {#settimeout}

zero delay, setTimeout(func, 0), func 在当前正在执行的脚本执行完成后执行

对浏览器而言，嵌套的定时器，出于历史原因:

after five nested timers, the interval is forced to be at least 4 milliseconds


### setInterval {#setinterval}

每次调用开始计时，而不是调用结束后计时，函数两次调用的间隔 (StartB - endA ) 并不是严格的 delay 时间
