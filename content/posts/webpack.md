+++
title = "Webpack"
author = ["wenhu"]
date = 2022-05-28T21:52:00+08:00
tags = ["frontend"]
draft = false
+++

## 配置[^fn:1] {#配置}

配置结构

{{< figure src="/ox-hugo/webpack.png" >}}


## 工作过程 {#工作过程}

1.  根据入口文件构建依赖图
2.  处理依赖图里的所有资源
3.  生成 js bundle，清单文件

{{< figure src="/ox-hugo/webpack1.png" >}}


## Loader {#loader}

将任意类型文件转译为 JavaScript 代码


## Plugin {#plugin}

-   SplitChunksPlugin

-   DllPlugin

    拆包，用于提高构建速度

    创建一个 manifest.json 文件，被 DllReferencePlugin 使用，作于依赖映射

    > The term "DLL" stands for Dynamic-link library which was originally introduced by Microsoft

-   DllReferencePlugin

    引用 dll 包， require 预构建的依赖

    DllReferencePlugin and DllPlugin 在不同的 webpack 配置中使用

-   webpack-spritesmith

    实现雪碧图效果


## 代码分割 {#代码分割}

基于入口的代码分割


## Webpack5 {#webpack5}

-   Asset Module

-   持久化缓存

-   实验特性 lazyCompilation

用于实现 entry 或异步引用模块的按需编译

能够极大提升冷启动速度


## 优化 {#优化}

-   使用 entry.runtime 管理运行时代码，将运行时抽离为独立 Bundle，减少 bundle 体积

-   使用 noParse 跳过文件编译

    noParse 文件不能存在对其它文件的依赖，除非运行环境支持这种模块化方案

    由于跳过了内容分析过程，Webpack 无法标记该文件的导出值，也就无法实现 Tree-shaking。

-   约束 Loader 执行范围

-   开发模式禁用产物优化

-   最小化 watch 监控范围

-   跳过 TS 类型检查
-   慎用 source-map

    开发环境使用 eval ，确保最佳编译速度；

    生产环境使用 source-map，获取最高质量

-   HappyPack

    多进程方式运行资源加载(Loader)逻辑；

    作者已经明确表示不会继续维护，扩展性与稳定性缺乏保障，随着 Webpack 本身的发展迭代，可以预见总有一天 HappyPack 无法完全兼容 Webpack

-   Thread-loader

    社区维护，同样以多进程方式运行资源加载逻辑；

    优点：

    目前还处于持续迭代维护状态，理论上更可靠，使用方式简单

    缺点：

    在 Thread-loader 中运行的 Loader 不能调用 emitAsset 等接口，这会导致 style-loader 这一类加载器无法正常工作，解决方案是将这类组件放置在 thread-loader 之前，如 ['style-loader', 'thread-loader', 'css-loader']；

    Loader 中不能获取 compilation、compiler 等实例对象，也无法获取 Webpack 配置

-   Parallel-Webpack

    多进程方式运行多个 Webpack 构建实例

    这种技术实现，对单 entry 的项目没有任何收益，只会徒增进程创建成本；

    但特别适合 MPA 等多 entry 场景，或者需要同时编译出 esm、umd、amd 等多种产物形态的类库场景

    缺点：  repo 已经 readonly 了，在 webpack 5 中已经不支持了

-   TerserWebpackPlugin

    支持多进程方式执行代码压缩、uglify 功能


## 常见资源处理 {#常见资源处理}

-   Typescript

    babel-loader 加上 @babel/preset-typescript 规则集

    缺点： 无类型校验
    ```js
      module.exports = {
      /* ... */
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-typescript'],
                },
              },
            ],
          },
        ],
      },
    };
    ```

-   CSS

    css-loader 让 Webpack 能够正确理解 CSS 代码、分析资源依赖；style-loader、mini-css-extract-plugin 则通过适当方式将 CSS 插入到页面，对页面样式产生影响

-   图片处理

    file-loader: 原始图片会被重命名并复制到产物文件夹，同时在代码中插入图片 URL 地址

    url-loader: 对于小于阈值 limit 的图像直接转化为 base64 编码；大于阈值的图像则调用 file-loader 进行加载

    raw-loader: 不做任何转译，只是简单将文件内容复制到产物中，适用于 SVG 场景，例如如下配置：

    image-webpack-loader: 图像压缩

    responsive-loader : 响应式图片


## external {#external}

Webpack 编译过程会跳过 externals 所声明的库，并假定消费场景已经安装了相关依赖，常用于 NPM 库开发场景；在 Web 应用场景下则常被用于优化性能。

例如，我们可以将 React 声明为外部依赖，并在页面中通过 &lt;script&gt; 标签方式引入 React 库，之后 Webpack 就可以跳过 React 代码，提升编译性能。


## 多环境打包 {#多环境打包}

-   开发环境需要使用 webpack-dev-server 实现 Hot Module Replacement；

-   测试环境需要带上完整的 Soucemap 内容，以帮助更好地定位问题；

-   生产环境需要尽可能打包出更快、更小、更好的应用代码，确保用户体验


## 分包 {#分包}

Initial Chunk：entry 模块及相应子模块打包成 Initial Chunk；

Async Chunk：通过 import('./xx') 等语句导入的异步模块及相应子模块组成的 Async Chunk；

Runtime Chunk：运行时代码抽离成 Runtime Chunk，可通过 entry.runtime 配置项实现


## source-map {#source-map}


## HMR {#hmr}

模块热重载

[^fn:1]: [webpack](https://juejin.cn/book/7115598540721618944/section/7116188597220278303?enter_from=course_center&utm_source=course_center)