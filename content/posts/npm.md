+++
title = "npm"
author = ["wenhu"]
date = 2022-07-17T16:00:00+08:00
tags = ["npm"]
draft = false
+++

## Peer dependency {#peer-dependency}

对等依赖，通常用来表示插件和宿主包之间的依赖关系

对宿主包比较宽松的版本限制

对宿主包没有显式依赖关系，即没有直接的 require 或 import

冲突时会 warning，不会同时安装两个副本

由使用方决定安装什么版本

比如 react 组件，声明 react 为 peerDependency 及版本范围即可，因为使用你组件的项目肯定是个 react 项目，已经安装了 react

如果继续声明 react 为 dependency, 当跟宿主环境不一致时，同时存在两个 react 版本，会带来额外的冲突风险


## Dependency {#dependency}

运行时依赖，冲突时，会安装不同的版本


## Dev dependency {#dev-dependency}

开发依赖，不会打到最终的包里
