+++
title = "css"
author = ["wenhu"]
date = 2023-01-02T20:13:00+08:00
tags = ["css"]
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


## Stacking context {#stacking-context}

在正常的文档流中，后面的元素层级比前面的元素层级高

定位的元素层级比没有定位的元素层级高

层叠上下文[^fn:2]

dom 元素在 z 方向的堆叠顺序问题

层叠上下文内部的元素，在其层叠上下文的 z 轴上按序排列

父元素创建了层叠上下文，其子元素的 z 基于其父元素

如何构建层叠上下文：

-   Root 元素 html
-   position 值非 static， z-index 非 auto 元素
-   opacity 非 1
-   transform 非 none
-   其他...

z-index:

作用于非 position: static 的元素


## Margin collapse {#margin-collapse}

外边距重叠[^fn:3]

top, bottom 属性重叠，值为相对最大值，仅限垂直方向

display: flex 容器内没有重叠


## Composition layer {#composition-layer}


## 居中 {#居中}

[^fn:1]: [Intro_to_formatting_contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)
[^fn:2]: [The_stacking_context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
[^fn:3]: [Mastering_margin_collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)