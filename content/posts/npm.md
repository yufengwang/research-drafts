+++
title = "npm"
author = ["wenhu"]
date = 2022-07-17T16:00:00+08:00
tags = ["node"]
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


## 依赖管理 {#依赖管理}


### 锁不锁版本[^fn:1] {#锁不锁版本}

理想的 semver 是 break.feat.bugfix，现实的 semver 是 break.break.break

-   不锁根据 semver 自动升级，可能被投毒或引入有 bug 的代码，造成故障

    我本地都是好的，测试也测过，怎么发上去就挂了？

    出问题了，责任算谁的？
-   锁

    不能及时跟进安全修复，时间久了就是技术债，怎么升也升不动了

[^fn:1]: [锁不锁依赖](https://mp.weixin.qq.com/s?__biz=MjM5NDgyODI4MQ==&mid=2247484466&idx=1&sn=7ace1e9c2fb321b1af57546e3e00d8ee&chksm=a6809ea491f717b24a9eb7f7f26fd90c98aa45157b4334042a09a5edaf0cf0ed27078784c1ab&cur_album_id=2199691505051729920&scene=189#wechat_redirect)