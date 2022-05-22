+++
author = ["wenhu"]
draft = false
+++

## 任务队列 {#任务队列}

requestIdleCallback 和 requestAnimationFrame 的区别


### ric {#ric}

在每一帧的空闲期执行，可能不执行


### raf {#raf}

1.  通过事件监听器注册的回调将会在同一帧中执行
2.  通过 raf 注册的回调将在下一帧中执行
