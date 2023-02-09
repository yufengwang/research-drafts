+++
title = "React"
author = ["wenhu"]
date = 2022-12-13T11:32:00+08:00
tags = ["react"]
draft = false
+++

## Concepts {#concepts}

React Element:

An element is a plain object describing a component instance or DOM node and its desired properties

js 对象，描述需要被渲染的元素，包括其类型及属性；比真实的 Dom element 更轻量

有 class and functional components, host components (DOM nodes), portals 这些类型

Dom Element:

type 为 dom type string (e.g. 'h1') 的 React Element，用于描述 Dom 节点

Component Element:

type 为 Function 或 Class 的 React Element，用于描述 React Component

Component:

class or function, 接收 props，返回 Element Tree

Element Tree:

即所谓的 virtual dom

JSX:

UI 的声明式描述，可被 Babel 转为标准的 JavaScript 语法

例如:

```js
  <button key="1" onClick={this.onClick}>Update counter</button>
```

被转换为：

```js
  React.createElement(
                'button',
                {
                    key: '1',
                    onClick: this.onClick
                },
                'Update counter'
            )
```

返回的 React Element：

```js
   {
        $$typeof: Symbol(react.element),
        type: 'button',
        key: "1",
        ref: null,
        props: {
            children: 'Update counter',
            onClick: () => { ... }
        }
    }
```


## Source Code {#source-code}

```bash
 --packages
    |- react
    |- react-dom (渲染器)
    |- react-reconciler
    |- scheduler
```


## Reconciler {#reconciler}

Stack 改成 Fiber 本质上是递归改循环, Stack 会占用 Call Stack，阻塞 Main Thread，从而使其他高优先级的任务得不到执行

改成 Fiber 架构后，每次循环体的执行，只会占用有限的 Call Stack，不会过度增长，单次循环体执行完后，Call Stack 为空，在 Event Loop 的调度下，其他高优先级的任务从任务队列里出队，进入到 Call Stack 里执行


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

在计算机科学里，Fiber 称之为纤程，即轻量级的执行线程[^fn:1]

Fiber 跟 Thread 共享地址空间，Fiber 使用协作式多任务( cooperative multitasking ), 而 Thread 使用抢占式多任务(preemptive multitasking)

一个进程可以有多个线程同时执行，一个线程可以有多个纤程同时执行，目的都是为了实现并发

对浏览器而言，用户的 js 执行只有一个主线程，那么为了实现并发，纤程是自然而然的方案

React Fiber:

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

每一 react element 构造一个 fiber 节点，每个 fiber 节点是一个工作单元，一系列 fiber 节点构成一个 fiber 特殊的链表。该数据结构的优点是便于找到下次的工作单元

工作单元执行顺序： 执行完所有的 children，如果没有 children，则执行其兄弟节点，如果没有 children 也没有兄弟节点执行其 uncle，没有 uncle 则到 root

{{< figure src="/ox-hugo/fiber.png" >}}

针对每个 Fiber 节点要做三件事：

1.  将元素添加到 dom 上
2.  创建该元素 children 的 Fiber 节点
3.  选择下次的工作单元

FiberNode 的简单结构:[^fn:2]

```js
const newFiber = {
  stateNode: React Element,// 指向Fiber相关联的React Element, 例如类实例，Dom 元素
  child: Fiber, // 子 Fiber
  sibling: Fiber, // 相邻的兄弟 Fiber
  return: Fiber, // 指向父级 Fiber 节点
  type: element.type, // 当前fiber的类型，不同的类型有不同的工作要做
  props: element.props, // 当前fiber的props
  dom: null, // 该fiber节点对应的dom对象
  alternate: null, // 指向其对应的节点 current -> workInProgress, current <- workInProgress,
  effectTag: 'PLACEMENT', // commit阶段用到，当前节点的副作用标签
  nextEffect: Fiber // 下一个副作用执行的Fiber
  hooks: [],
  tag: '',
  updateQueue: '',
  memoizedState: ''// 当前屏幕上对应的状态
  memoizedProps: '' //Props of the fiber that were used to create the output during the previous render
  pendingProps: '' //Props that have been updated from new data in React elements and need to be applied to child components or DOM elements
  // 调度器相关的属性
  expirationTime: '',
  childExpirationTime: '',
  mode: '',
};
```

首次渲染时，Fiber 节点根据 React Element Type 创建，后续更新时， Fiber 被复用，只更新 Fiber 对象上的属性

每个 Fiber 节点的工作完成之后，commit 整个 Fiber tree 到 dom 上

函数式组件没有对应的 dom 节点, 需要调用函数拿到其 children

更新时，根据当前的 Fiber Tree，构建 workInProgress tree，遍历树，完成所有的工作，然后渲染到屏幕上

副作用：

不用的 Fiber 类型有不同的副作用，例如 Dom 节点的增删改，类组件的生命周期函数调用，Ref 的更新等

React 内部维护了一个线性链表，将所有有副作用的 Fiber 节点串联起来，用于处理副作用


## 渲染逻辑 {#渲染逻辑}


### Render Phase {#render-phase}

The result of the phase is a tree of fiber nodes marked with side-effects

It’s important to understand that the work during the first render phase can be performed asynchronously


### Commit Phase {#commit-phase}

commit phase is always synchronous, React needs to do them in a single pass

This is because the work performed during this stage leads to changes visible to the user, e.g. DOM updates.


### Work Loop {#work-loop}


## Renderer {#renderer}

将 React Element Tree 渲染到对应的平台(browser, native)


## Hooks {#hooks}

挂在 Fiber 节点上，链表结构


### useEffect {#useeffect}


## Events {#events}

React 17 不再使用 Event pooling，之前的版本是为了性能考虑使用 Event pooling

SyntheticEvent: 为了抹平浏览器差异，提供一致的表现

统一注册到顶层 Container


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
[^fn:2]: [inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)