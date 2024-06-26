+++
title = "React"
author = ["wenhu"]
date = 2022-12-13T11:32:00+08:00
tags = ["react"]
draft = false
+++

## Philosophy {#philosophy}

告诉我你要（展示）什么，剩下的由框架去做


## Concepts {#concepts}


### Element {#element}

React Element:

js 对象，描述需要被渲染的元素，包括其类型及属性；比真实的 Dom element 更轻量

有 class and functional components, host components (DOM nodes), portals 这些类型

Dom Element:

type 为 dom type string (e.g. 'h1') 的 React Element，用于描述 Dom 节点

Component Element:

type 为 Function 或 Class 的 React Element，用于描述 React Component

Component:

class or function, 接收 props，返回 Element Tree

Virtual Dom:

真实 dom 对象的轻量表示


### JSX {#jsx}

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

double-buffering


## React 源码 {#react-源码}

```bash
 --packages
    |- react // 核心
    |- react-dom // (渲染器)
    |- react-reconciler // 调和
    |- scheduler // 调度器
```

比较重要的几个函数

```js
function workLoopConcurrent() {
    // Perform work until Scheduler asks us to yield
    while (workInProgress !== null && !shouldYield()) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      performUnitOfWork(workInProgress);
    }
  }

```


## Reconciler {#reconciler}

Stack 改成 Fiber 本质上是递归改循环, Stack 会占用 Call Stack，阻塞 Main Thread，从而使其他高优先级的任务得不到执行

改成 Fiber 架构后，每次循环体的执行，只会占用有限的 Call Stack，不会过度增长，单次循环体执行完后，Call Stack 为空，在 Event Loop 的调度下，其他高优先级的任务从任务队列里出队，进入到 Call Stack 里执行


### Stack Reconciler {#stack-reconciler}

-   利用系统栈
-   同步
-   自顶向下的递归，容易阻塞主线程
-   不可中断


### Fiber Reconciler {#fiber-reconciler}

Render 阶段，处理完一个任务后，返回下个任务的指针，可被浏览器中断去执行其他任务后，再恢复执行下一个任务

-   异步
-   将任务拆为小块 chunk
-   任务设置优先级，
-   任务可暂停，可恢复，可丢弃，可重用

遍历流程：[参考](https://github.com/facebook/react/issues/7942?source=post_page---------------------------#issue-182373497)

```js
let root = fiber;
let node = fiber;
while (true) {
  // Do something with node
  if (node.child) {
    node = node.child;
    continue;
  }
  if (node === root) {
    return;
  }
  while (!node.sibling) {
    if (!node.return || node.return === root) {
      return;
    }
    node = node.return;
  }
  node = node.sibling;
}

```

两个阶段

1.  render phase

    reconciliation, 计算变更，异步

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


### Key {#key}

没有 key 时，假设在列表前面插入一条数据，react 会将整个列表都 rerender 一遍，dom 节点会被重新创建，耗性能

使用 index 作为 key 的话，非受控组件的状态会串掉

如果元素不会被重新排序，用 index 做 key 也可以，适用于静态列表

使用 key 时, key 一致，会复用旧的 Fiber 节点的状态，避免 dom 节点的重新创建


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
  updateQueue: '', // 当前 Fiber 待更新的状态队列， effect 队列
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

异步, 渲染结果为一棵 Fiber 树，其上对应的 Fiber 节点会被打上对应的副作用标签，


### Commit Phase {#commit-phase}

同步，更新页面，避免造成视觉结果不一致, single pass


### Work Loop {#work-loop}


## Renderer {#renderer}

将 React Element Tree 渲染到对应的平台(browser, native)


## Hooks {#hooks}

挂在 Fiber 节点上，链表结构


### useDebugValue {#usedebugvalue}


### useId {#useid}

在组件内部生成唯一 id，注意不能用于 key 的生成


### useMemo {#usememo}

缓存的是计算结果，首次渲染，返回 callback 返回的值，后续渲染，如过 deps 变了，则重新计算结果并返回，否则继续返回之前的值

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

更通用


### useCallback {#usecallback}

缓存的是函数本身

当 react 组件渲染时，其所有子组件都会得到渲染

用来包裹函数，避免子组件重复渲染


### useEffect {#useeffect}


### useLayoutEffect {#uselayouteffect}

在浏览器 repaint 前调用的 effect，会影响性能，一般建议用 useEffect

也就是在用户看到最终的视觉效果 (pixels) 前，例如在 repaint 前，计算元素的尺寸等信息

如何阻塞浏览器的 repaint ？ workloop 里不要 yield，让用户代码继续占用主线程


### useInsertionEffect {#useinsertioneffect}

在 Dom 操作前动态注入 style


### useImperativeHandle {#useimperativehandle}

作用：

暴露自定义的 ref handle 给父组件, 用于父组件调用子组件的方法，当通过 props 无法做到时，用这个，不要滥用

例如：节点滚动，选择文本等

第三个参数的比较采用的是 Object.is 比较算法

```js
// MyInput.js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});

export default MyInput;

import { useRef } from 'react';
import MyInput from './MyInput.js';

function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```


### useDeferredValue {#usedeferredvalue}

可用于渲染优化, 也可跟 Suspense 结合使用

```js

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  console.log('text',text, 'defer',deferredText)
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}

```

text 更新，deferredText 并不会立马更新,让浏览器能尽快的响应高优先级的事件，后处理其他渲染

新值在后台渲染，可被打断，

有更新时，先渲染旧值，旧值渲染完后，在后台渲染新值，后台渲染可被打断，从而让出主线程，让浏览器执行更高优先级的任务（例如用户输入事件）

用于性能优化时，可延迟渲染慢组件，通常要跟 memo 结合起来用


### useLayoutEffect {#uselayouteffect}


### useTransition {#usetransition}

用于标识某些状态的更新为非阻塞的 transition，让用户不觉得卡顿，也可以用于阻止显示 loading 态

例如 tab 切换时，慢 tab 会被打断渲染，直接渲染新 tab

建议将路由切换，page 切换设置为 transition

```js
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```


### useContext {#usecontext}


### 常见问题 {#常见问题}

-   为什么不能在 if, for 等语句中用 hook

    hook 对象挂在 Fiber 节点的 memoizedState 属性上，按出现在函数体中的先后顺序，用 next 串起来，如过某个 hook 在 if 条件中没有执行，后面的 hook 拿到的状态就为其前一个 hook 的状态，那么状态就串了


## Events {#events}

React 17 不再使用 Event pooling，之前的版本是为了性能考虑使用 Event pooling

SyntheticEvent: 为了抹平浏览器差异，提供一致的表现

统一注册到顶层 Container


## Ref {#ref}


## React API {#react-api}


### memo {#memo}

用 memo 把组件包一层后，当 props 变了时，组件才会重渲染。

如果不用 memo 包一层的话，父组件 rerender，子组件接收到的 props 不变，子组件也会重渲染(因为要拿到子组件return出来的 Element Tree)。

memo 了一下， props 不变，则直接从缓存里拿 element tree(我猜的，待验证)

通常结合 useMemo，useCallback 使用

被 memo 的组件，当其内部 state 或外部的 context 变了时，其仍会重渲染


### forwardRef {#forwardref}

将子组件的 Dom 节点暴露给父组件

尽量用 useImperativeHandle 暴露若干方法，而不是完整的暴露 Dom 元素给父组件


### startTransition {#starttransition}

状态更新不阻塞 UI

可在组件外部调用，例如数据请求库


### Suspense {#suspense}

当子组件的 data 和 code 都加载完时，子组件才会被渲染，否则渲染最近的 suspense fallback

只有启用了 suspense 的数据源才会激活 suspense 组件

目前仅适用于跟 React.lazy 结合，实现组件懒加载

IO 密集型任务


### StrictMode {#strictmode}

给开发模式启用额外的行为和 warning，仅用于其内部子树

-   开发模式下会渲染两次，找到 impure 的渲染
-   开发模式下会跑两次 effect
-   对弃用的 api 使用做检测


### ErrorBoundary {#errorboundary}

用于捕获子树的异常，提供 fallback 的 ui，避免 crash 掉整个应用

下面这些异常不能被捕获

-   事件处理函数
-   异步代码(setTimeout or requestAnimationFrame)
-   服务端渲染
-   error boundaries 自己抛出来的异常

实现了 static getDerivedStateFromError() or componentDidCatch()  的类组件可作为 error boundary

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>

```

可以理解为针对组件的 catch()， 只有类组件可以作为 error boundaries

自 React 16 后， 没有被 error boundaries 捕获到的异常，会导致整个组件树被卸载

> We debated this decision, but in our experience it is worse to leave corrupted UI in place than to completely remove it. For example, in a product like Messenger leaving the broken UI visible could lead to somebody sending a message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing


## LEGACY REACT APIS {#legacy-react-apis}


### PureComponent {#purecomponent}


## Context {#context}


## Lane {#lane}

总共有 31 条车道


## 渲染优化 {#渲染优化}

父组件重渲染时，在没有做任何优化的前提下，子组件接收到的 props 无论有没有变化，子组件都会重渲染

1.  使用 children 接收 JSX，这样当父组件渲染时，children 不会被渲染
2.  尽量使用 local state
3.  React.memo, useMemo, useCallback
4.  组件接收的 props 要尽可能的精简，尽量接收独立的值，而不是一个大对象


## 运行机制 {#运行机制}

注意这里是 Didact[^fn:3] 的实现，用于辅助理解 React 的逻辑


### 首次渲染 {#首次渲染}

拿到一棵 Element Tree，渲染到 container 中

从 container 新建 wipRoot Fiber 对象, nextUnitOfWork 指向当前 wipRoot, 由 workLoop 驱动开始渲染

```js
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
```

渲染做的事情:

1.  针对Fiber类型，更新对应的组件
2.  Reconcile children，按顺序从上往下 diff，从每个 Children 的 Element 元素创建对应的 Fiber 节点，并用指针串起来
3.  依据遍历逻辑， 返回下一个 Fiber 节点, 重复所做的事情

渲染完毕会得到一棵 Fiber 树，记在 currentRoot 指针上, wipRoot 置为 null


### 状态更新 {#状态更新}

更新时，新建 wipRoot Fiber 节点，某些属性指向 currentRoot 相关属性

```js
 wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
 };
```

当有状态更新时，会将状态更新挂在 Fiber 节点的 updateQueue 属性上

在 workLoop 的作用下，React 自 HostRoot 开始遍历所有 Fiber 节点


### 提交变更 {#提交变更}

提交变更后，currentRoot 指向 wipRoot, wipRoot 指向 null

currentRoot, wipRoot 均为 Fiber 对象


## Server Components {#server-components}


## React 18 {#react-18}


### Concurrent {#concurrent}

并发模式，底层的渲染实现细节变更，可被中断渲染，可在后台渲染

-   非阻塞式渲染
-   基于优先级更新
-   后台预渲染
-   &lt;Offscreen /&gt;


### Suspense {#suspense}

在某些(Next.js, Remix)框架中，可以用 suspense 做数据获取

React18 之前，Suspense 仅可以跟 React.lazy 配合使用做代码分割

> the goal is to extend support for Suspense so that eventually, the same declarative Suspense fallback can handle any asynchronous operation (loading code, data, images, etc)[^fn:4]


### Automatic batching {#automatic-batching}

自动批处理，把多次状态更新在一次 rerender 里处理掉，用于提高性能

在没有自动批处理的时候，只有事件监听器里的状态更新会被批处理

```js
// Before: only React events were batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);

// After: updates inside of timeouts, promises,
// native event handlers or any other event are batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);

```


## Scheduler {#scheduler}

Scheduler periodically yields in case there is other work on the main
thread, like user events. By default, it yields multiple times per frame.
It does not attempt to align with frame boundaries, since most tasks don't
need to be frame aligned; for those that do, use requestAnimationFrame.

为啥需要调度器

浏览器里 js 的执行是单线程的，所以需要调度器去调度任务，使其不能长时间的执行去阻塞主线程，从而导致页面卡顿


## 状态管理 {#状态管理}


### Redux {#redux}


## Q &amp; A {#q-and-a}

[^fn:1]: [Fiber](https://en.wikipedia.org/wiki/Fiber_(computer_science))
[^fn:2]: [inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
[^fn:3]: [build-your-own-react](https://pomb.us/build-your-own-react/)
[^fn:4]: [React v18.0](https://reactjs.org/blog/2022/03/29/react-v18.html)
