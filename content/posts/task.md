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


## 任务队列 {#任务队列}

requestIdleCallback 和 requestAnimationFrame 的区别


### requestAnimationFrame {#requestanimationframe}

注册高优先级的任务

1.  通过事件监听器注册的回调将会在同一帧中执行
2.  通过 raf 注册的回调将在下一帧中执行


### requestIdleCallback {#requestidlecallback}

注册低优先级的任务在每一帧的空闲期执行，可能不执行
