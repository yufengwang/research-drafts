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

    js 对象，描述需要被渲染的元素，包括其类型及属性；比真实的 Dom element 更轻量

-   Dom Element

    type 为 dom type string (e.g. 'h1') 的 React Element，用于描述 Dom 节点

-   Component Element

    type 为 Function 或 Class 的 React Element，用于描述 React Component

-   Component

    class or function, 接收 props，返回 Element Tree

-   Element Tree

    即所谓的 virtual dom


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

-   同步
-   自顶向下的递归，容易阻塞主线程
-   不可中断


### Fiber Reconciler {#fiber-reconciler}

-   异步
-   将任务拆为小块 chunk
-   任务设置优先级，
-   任务可暂停，可恢复，可丢弃，可重用

两个阶段

1.  render phase

    计算变更， 异步

2.  commit phase

    提交变动，同步


## Reconciliation {#reconciliation}

调和

首次渲染：

全量的 element tree render 到 dom 节点

后续渲染：

reconciliation 后更新（增，删，改）变更的 dom

每次 rerender 都生成一个 new element tree，diff(old element tree, new element tree) 决定 ui 怎么更新

1.  如果元素类型不一致，旧树被销毁(dom 元素被移除，维持的状态被移除)，重新构建新的树，旧树的所有子树一样被销毁
2.  如果元素类型一致，保留 dom 节点，仅更新变动的 props
3.  用 key 去标识某个 children 是否在元素数组里更换了位置

复杂度:

O(n)，n 为 element tree 的节点数

基于两个假定的前提:

-   不同的 element type, render 不同的树
-   element 的 child 有唯一 key


## Fiber {#fiber}


### 背景 {#背景}

在计算机科学里，Fiber 称之为纤程，即轻量级的执行线程[^fn:1]

Fiber 跟 Thread 共享地址空间，Fiber 使用协作式多任务( cooperative multitasking ), 而 Thread 使用抢占式多任务(preemptive multitasking)

一个进程可以有多个线程同时执行，一个线程可以有多个纤程同时执行，目的都是为了实现并发

对浏览器而言，用户的 js 执行只有一个主线程，那么为了实现并发，纤程是自然而然的方案


### 浏览器架构 {#浏览器架构}

浏览器里的并发任务


### React 里的 Fiber {#react-里的-fiber}

在 React 里， Fiber = unit of work，最小任务单元

Fiber: js 对象，用于描述 React Component 上要进行的工作或已经完成的工作, a unit of work

1:1 relation (element, dom node, component. etc.)

Fiber 树遍历顺序:

Fiber is re-implementation of the stack, specialized for React components. You can think of a single fiber as a virtual stack frame

1.  处理当前 fiber
2.  有 child，child 为下一个任务单元
3.  无 child，sibling 为下一个任务单元
4.  无 child, 无 sibling，找 uncle 节点(父节点的 sibling)
5.  parent 无 sibing，一直往上找，直到找到有 sibling 节点的祖先节点，并处理其 sibling 节点
6.  最后找到 root，所有 fiber 处理完毕，任务结束

属性：

1.  child，指向第一个子节点
2.  sibling，
3.  return


## Renderer {#renderer}

将 React Element Tree 渲染到对应的平台(browser, native)


## Hooks {#hooks}


## Events {#events}

React 17 不再使用 Event pooling，之前的版本是为了性能考虑使用 Event pooling

SyntheticEvent: 为了抹平浏览器差异，提供一致的表现


## Ref {#ref}


## Context {#context}


## Lane {#lane}


## React 18 {#react-18}


### Concurrent {#concurrent}

并发模式，底层的渲染细节变更，可被中断渲染，可在后台渲染


### Suspense {#suspense}


### Automatic batching {#automatic-batching}

自动批处理

[^fn:1]: [Fiber](https://en.wikipedia.org/wiki/Fiber_(computer_science))