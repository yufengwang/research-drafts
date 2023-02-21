+++
title = "Webpack"
author = ["wenhu"]
date = 2022-05-28T21:52:00+08:00
tags = ["webpack"]
draft = false
+++

## 配置 {#配置}

配置结构


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

-   webpack-spritesmith

    实现雪碧图效果


## 代码分割 {#代码分割}

基于入口的代码分割


## Webpack5 {#webpack5}

Asset Module


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
