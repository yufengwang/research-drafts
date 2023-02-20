+++
title = "Webpack"
author = ["wenhu"]
date = 2022-05-28T21:52:00+08:00
tags = ["webpack"]
draft = false
+++

## 工作过程 {#工作过程}

1.  根据入口文件构建依赖图
2.  处理依赖图里的所有资源
3.  生成 js bundle，清单文件


## Loader {#loader}


## Plugin {#plugin}

-   SplitChunksPlugin
-   DllPlugin

    拆包，用于提高构建速度

    创建一个 manifest.json 文件，被 DllReferencePlugin 使用，作于依赖映射

    > The term "DLL" stands for Dynamic-link library which was originally introduced by Microsoft

-   DllReferencePlugin

    引用 dll 包， require 预构建的依赖

    DllReferencePlugin and DllPlugin 在不同的 webpack 配置中使用


## 代码分割 {#代码分割}

基于入口的代码分割


## Webpack5 {#webpack5}


## 配置优化 {#配置优化}


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


## external {#external}

Webpack 编译过程会跳过 externals 所声明的库，并假定消费场景已经安装了相关依赖，常用于 NPM 库开发场景；在 Web 应用场景下则常被用于优化性能。

例如，我们可以将 React 声明为外部依赖，并在页面中通过 &lt;script&gt; 标签方式引入 React 库，之后 Webpack 就可以跳过 React 代码，提升编译性能。
