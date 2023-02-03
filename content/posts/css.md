+++
title = "css"
author = ["wenhu"]
date = 2023-01-02T20:13:00+08:00
tags = ["browser"]
draft = false
+++

## BFC {#bfc}

Block Formatting Context&nbsp;[^fn:1]

A mini-layout inside our layout，一个小的块级格式化布局上下文

不同的 Formatting context 会影响其内部子元素的表现形式

如何创建 BFC:

-   display: inline-block
-   设置 float
-   position 为 absolute 或 fixed
-   display: flow-root

BFC 的表现：

-   包围内部的浮动元素
-   排除外部浮动
-   抑制外边距重叠


## Margin collapse {#margin-collapse}

外边距重叠[^fn:2]

top, bottom 属性重叠，值为相对最大值，仅限垂直方向

display: flex 容器内没有重叠

[^fn:1]: [Intro_to_formatting_contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)
[^fn:2]: [Mastering_margin_collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)