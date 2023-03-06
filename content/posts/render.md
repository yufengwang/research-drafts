+++
title = "渲染"
author = ["wenhu"]
date = 2022-06-29T15:54:00+08:00
tags = ["browser"]
draft = false
+++

## Process Model {#process-model}

浏览器的多进程模型

进程：

-   Browser Process

    Controls "chrome" part of the application including address bar, bookmarks, back and forward buttons.
    Also handles the invisible, privileged parts of a web browser such as network requests and file access.
    浏览器 ui 部分，地址栏，书签等；网络请求，文件访问等

-   Renderer Process
    每个 tab 一个 renderer process，控制当前显示的 tab 内的一切

    在沙盒中执行，避免安全隐患

-   GPU Process
    处理 GPU 绘制人物
-   Plugin Process
    控制当前页面使用的所有插件，例如 flash

-   Utility Process

-   Extension Process
    控制当前页面使用的所有插件，例如 flash

优点：

-   稳定性，一个 tab 失去响应不会影响另一个 tab
-   安全性，进程间资源隔离

缺点：消耗内存，进程间通信成本


## Rendering [^fn:1] {#rendering}

Rendering: HTML -&gt; pixels


### Rendering engine[^fn:2] {#rendering-engine}

用于渲染 web pages

A rendering engine is a software that:

-   Implements the specs of the web platform

    实现 web 平台的规范

-   Carries out the critical rendering path

    执行关键渲染路径

-   Embeds the JavaScript engine

常见的渲染引擎：Blink (Chrome), Gecko (Mozilla) and WebKit (Apple)


### critical rendering path {#critical-rendering-path}

-   Parses the HTML and starts building the Document Object Model (DOM)
    构建 DOM 树
-   Requests external resources (stylesheets, scripts, images, etc.)
    请求外部资源
-   Parses the styles and builds the CSS Object Model (CSSOM)
    构建 CSSOM
-   Computes styles for the visible nodes in the DOM tree and creates a render tree that contains the computed styles
    构建 Render Tree
-   Determines the visual geometry (width, height and position) of the elements based on the viewport size (and orientation for mobile devices)
    计算宽高位置等
-   Paints the pixels on the screen
    绘制

处理首次渲染，后续用户交互下的更新


### Render Pipeline {#render-pipeline}

{{< figure src="/ox-hugo/BrowserRenderingPipeline01.png" >}}


### Layout {#layout}

又可称之为 Reflow

计算元素的几何尺寸，坐标位置，更改 width, height, position 等属性会 relayout，比较耗时


### Forced reflow[^fn:3] {#forced-reflow}

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


### Main thread[^fn:4] {#main-thread}

在主线程上执行的任务(Tasks)有

1.  HTML, CSS 解析
2.  用户事件响应（e.g. click)
3.  js 代码执行
4.  接受网络数据
5.  render steps ( style, layout, paint )

    render steps 结束后，得到一帧 Frame

{{< figure src="/ox-hugo/render.png" >}}


### Worker thread {#worker-thread}

用于分担 CPU 密集型的计算任务


### Task queue {#task-queue}

任务队列，主线程繁忙时，task 进入到这里


## Pre-rendering {#pre-rendering}

预渲染, 包括 SSG 和 SSR


### SSG {#ssg}

static site generation


### SSR {#ssr}

Server Side Render


## CSR {#csr}

Client Side Render


## ISR {#isr}

增量静态重构建[^fn:5]

仅针对变动的 page 进行构建，而不是全量构建


## 参考 {#参考}

[^fn:1]: [browser render pipeline](https://www.webperf.tips/tip/browser-rendering-pipeline/)
[^fn:2]: [basics-introduction-processes-threads-web-ui-developers](https://www.telerik.com/blogs/angular-basics-introduction-processes-threads-web-ui-developers)
[^fn:3]: [ forced reflow](https://www.webperf.tips/tip/layout-thrashing/)
[^fn:4]: [ event loop](https://www.webperf.tips/tip/event-loop/)
[^fn:5]: [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)