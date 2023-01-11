+++
title = "渲染"
author = ["wenhu"]
date = 2022-06-29T15:54:00+08:00
tags = ["browser"]
draft = false
+++

## Render Pipeline[^fn:1] {#render-pipeline}

{{< figure src="/ox-hugo/BrowserRenderingPipeline01.png" >}}


### Layout {#layout}

又可称之为 Reflow

计算元素的几何尺寸，坐标位置，更改 width, height, position 等属性会 relayout，比较耗时


### Forced reflow[^fn:2] {#forced-reflow}

invalidates the Render Tree and forces a reflow

```js
const element = document.getElementById('modal-container');

element.classList.add('width-adjust'); // 1. invalidate Layout Tree
element.getBoundingClientRect(); // 2. force a synchronous reflow. This can be SLOW!
```

尽量避免同步 reflow


### Paint {#paint}

将 render tree 绘制到页面上

绘制像素，更改 box-shadow, background-color, text-color 等属性会 repaint


### Render tree {#render-tree}

Each node typically references a DOM node and a Computed Style


### Main thread[^fn:3] {#main-thread}

在主线程上执行的任务(Tasks)有

1.  HTML, CSS 解析
2.  用户事件响应（e.g. click)
3.  js 代码执行
4.  接受网络数据
5.  render steps ( style, layout, paint )

    render steps 结束后，得到一帧 Frame

{{< figure src="/ox-hugo/EventLoop06.png" >}}


### Task queue {#task-queue}

任务队列，主线程繁忙时，task 进入到这里


## CSR {#csr}

Client Side Render


## SSR {#ssr}

Server Side Render


## ISR {#isr}

增量静态重构建[^fn:4]

仅针对变动的 page 进行构建，而不是全量构建


## 参考 {#参考}

[^fn:1]: [browser render pipeline](https://www.webperf.tips/tip/browser-rendering-pipeline/)
[^fn:2]: [ forced reflow](https://www.webperf.tips/tip/layout-thrashing/)
[^fn:3]: [ event loop](https://www.webperf.tips/tip/event-loop/)
[^fn:4]: [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)