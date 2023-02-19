+++
title = "前端性能优化"
author = ["wenhu"]
date = 2023-02-15T23:28:00+08:00
tags = ["fe"]
draft = false
+++

待补充...


## 性能监测 {#性能监测}

监测方式: devtool performance tab, lighthouse 插件

window.performance， 可编程的性能 api


### 指标 {#指标}

-   Load
-   DCL
-   FP
-   FCP
-   FMP
-   LCP


## Webpack 性能优化 {#webpack-性能优化}


## React 性能优化 {#react-性能优化}

1.  shouldComponentUpdate，不需要更新时，return false，避免 re-render
2.  使用 React.PureComponent，自动比较 props 和 state


## 其他层面性能优化 {#其他层面性能优化}
