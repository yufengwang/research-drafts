+++
title = "React"
author = ["wenhu"]
date = 2022-12-13T11:32:00+08:00
tags = ["react"]
draft = false
+++

## Concepts {#concepts}

-   React Element

    An element is a plain object describing a component instance or DOM node and its desired properties

    js对象，描述需要被渲染的元素，包括其类型及属性；比真实的 Dom element 更轻量

-   Dom Element

    type 为 dom type string (e.g. 'h1') 的 React Element，用于描述 Dom 节点

-   Component Element

    type 为 Function 或 Class 的 React Element，用于描述 React Component

-   Component

    封装 Element Tree，接收 props，返回 Element Tree


## Source Code {#source-code}

```bash
 --packages
    |- react
    |- react-dom (渲染器)
    |- react-reconciler
    |- scheduler
```


## Reconciler {#reconciler}


### Stack Reconciler {#stack-reconciler}

自顶向下的递归，容易阻塞主线程


### Fiber Reconciler {#fiber-reconciler}

-   将任务拆为小块 chunk
-   任务有优先级，可中断，可恢复


## Reconciliation {#reconciliation}

调和

render(): 每次 render 都生成一个 Element 树，对 Element 树的 diff 结果决定 ui 怎么更新

1.  如果元素类型不一致，旧树被销毁(dom 元素被移除，维持的状态被移除)，重新构建新的树，旧树的所有子树一样被销毁
2.  如果元素类型一致，保留 dom 节点，仅更新变动的 props
3.  用 key 去标识某个 children 是否在元素数组里更换了位置


## Fiber {#fiber}

Fiber: js 对象，用于描述 React Component 上要进行的工作或已经完成的工作

Fiber 树遍历顺序:

1.  处理当前 fiber
2.  有 child，child 为下一个任务单元
3.  无 child，sibling 为下一个任务单元
4.  无 child, 无 sibling，找 uncle 节点(父节点的 sibling)
5.  parent 无 sibing，一直往上找，直到找到有 sibling 节点的祖先节点，并处理其 sibling 节点
6.  最后找到 root，所有 fiber 处理完毕，任务结束


## Renderer {#renderer}

将 React Element Tree 渲染到对应的平台(browser, native)


## Hooks {#hooks}


## Events {#events}


## Ref {#ref}


## Context {#context}


## React 18 {#react-18}


### Concurrent {#concurrent}

并发模式，底层的渲染细节变更，可被中断渲染，可在后台渲染


### Suspense {#suspense}


### Automatic batching {#automatic-batching}

自动批处理
