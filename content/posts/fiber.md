+++
title = "React Fiber"
author = ["wenhu"]
date = 2022-06-01T00:09:00+08:00
tags = ["react"]
draft = false
+++

## fiber 基本工作原理 {#fiber-基本工作原理}

每一 react element 构造一个 fiber 节点，每个 fiber 节点是一个工作单元，一系列 fiber 节点构成一个 fiber 特殊的链表。该数据结构的优点是便于找到下次的工作单元

\![image-20200530122438417](./fiber.png)

针对每个 fiber 节点要做三件事：

1.  将元素添加到 dom 上
2.  创建该元素 children 的 fiber 节点
3.  选择下次的工作单元

工作单元执行顺序： 执行完所有的 children，如果没有 children，则执行其兄弟节点，如果没有 children 也没有兄弟节点执行其 uncle，没有 uncle 则到 root

fiberNode 的简单结构:

\`\`\`js
const newFiber = {
  type: element.type, _/ 当前fiber的类型
  props: element.props, /_ 当前fiber的props
  parent: fiber, _/ 指向父级fiber节点
  dom: null, /_ 该fiber节点对应的dom对象
  alternate: null, _/ 指向上次commit的fiberNode
  effectTag: 'PLACEMENT', /_ commit阶段用到
  hooks: [],
};
\`\`\`

每个 fiber 节点的工作完成之后，commit 整个 fiber tree 到 dom 上

函数式组件没有对应的 dom 节点, 需要调用函数拿到其 children

\## diff 算法

1.  如果旧 fiber 跟新元素类型一致，保留 dom 节点，仅更新 props
2.  如果旧 fiber 跟新元素类型不一致，需要创建新的节点，替换掉旧的节点
3.  在这里用 key 去标识某个 children 是否在元素数组里更换了位置
