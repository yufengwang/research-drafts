+++
title = "CSS"
author = ["wenhu"]
date = 2023-01-02T20:13:00+08:00
tags = ["css"]
draft = false
+++

## Web 布局[^fn:1] {#web-布局}

-   无布局模式
-   表格布局模式
-   浮动、定位和框架( CSS Frameworks )布局模式

    浮动的初衷是用于排版的，只不过在那个年代，Web 开发者利用其特性来构建 Web 的布局，而且运用于 Web 布局很多年

    其中要属“圣杯 ”和“双飞翼 ”两者最为经典。这两种方法实现的都是以三列布局为主，而且两边的宽度是固定的，中间列是自适应，它们实现的效果是一样的，只是实现的思路不同

    定位布局的局限性:

    1.  需要明确指定元素的大小
    2.  需要明确计算元素位置坐标
    3.  难于维护

    css框架，如 bootstrap
-   响应式布局
-   Intrinsic Web Design

    不是内容以设计为导向（Content Design-Driven），而是只专注于让设计受内容驱动（Design Content-Driven）

-   组件驱动式 Web 设计（CDWD）

-   Flex &amp;&amp; Grid


## 加载方式 {#加载方式}

@import

从其他样式表里加载 css 到当前位置

```css
@import "custom.css";
@import url("chrome://communicator/skin/");

```


## @属性 {#属性}

-   @charset

声明当前样式表的字符集编码

当在 css 属性中使用非 ascii 编码时有用，例如 content 属性


## Cascading {#cascading}

级联：当多个 style 块给同一个元素设置了同一个属性，但是值不一样，值生效的规则

取决于以下三点

1.  Source order

    规则的来源顺序

2.  Specificity

    规则的特异性

3.  Importance

    规则的重要性


## 特异性 {#特异性}


### Normal Style {#normal-style}

选择器的权重，权重越大，优先级越高，权重相同，后出现的优先级更高

特异性仅在同一级联源和级联层中相关

当同一级联层中，选择器的特异性相等时，后出现的优先级更高

三列比较 ID - CLASS - TYPE

ID 大，则优先级更高，ID 一致，比较 Class ，值大优先级高，同理 type

-   ID 列

    id 选择器

-   CLASS 列

    类选择器，属性选择器 e.g. [type='radio']，伪类

-   TYPE 列

    类型选择器 e.g. p,h1, 伪元素, e.g. ::placeholder

<!--listend-->

```css
#myElement {
  color: green; /* 1-0-0  - WINS!! */
}
.bodyClass .sectionClass .parentClass [id="myElement"] {
  color: yellow; /* 0-4-0 */
}

#myElement {
  color: yellow; /* 1-0-0 */
}
#myApp [id="myElement"] {
  color: green; /* 1-1-0  - WINS!! */
}
:root input {
  color: green; /* 0-1-1 - WINS because CLASS column is greater */
}
html body main input {
  color: yellow; /* 0-0-4 */
}

input.myClass {
  color: yellow; /* 0-1-1 */
}
:root input {
  color: green; /* 0-1-1 WINS because it comes later */
}

```


### Inline Style {#inline-style}

```html
 <div style="font-weight:bold"> </div>
```

比 normal style 特异性都要高，可理解为 1-0-0-0

可通过 !important 去覆盖 inline-style


### !important {#important}

在 same origin and cascade layer，!important 的优先级最高，尽量少用，用了要加注释

多个规则都有 !important时，谁的 specificity 更高，最终用哪个


## 浮动 {#浮动}

clear 属性，将元素移动到其前面的 float 元素的下面


## Formatting Context {#formatting-context}

页面上的所有元素都在某个格式化上下文中，格式化上下文决定了元素在该上下文中的布局, 排列方式

脱离文档流的三种情况:

1.  浮动元素
2.  position: absolute fixed
3.  root element

元素脱离文档流会创建一个新的 BFC


### IFC {#ifc}

inline formatting contexts

元素在水平方向排列


### FFC {#ffc}

元素按弹性模式布局

flex formatting contexts


### BFC {#bfc}

可以看做一个独立的渲染区域

元素按块方式布局

盒模型之间，margin,border 等交互的方式

元素独占一行

Block Formatting Context&nbsp;[^fn:2]

A mini-layout inside our layout，一个小的块级格式化布局上下文

不同的 Formatting context 会影响其内部子元素的表现形式

&lt;html/&gt; 为初始 BFC

如何创建 BFC:

-   设置 float
-   position 为 absolute 或 fixed
-   display: inline-block
-   display: table-ceil
-   overflow 不为 visible
-   display: flow-root (包围内部浮动元素)
-   flex items, grid items

BFC 的表现：

-   包围内部的浮动元素
-   排除外部浮动
-   抑制外边距重叠


## Stacking context {#stacking-context}

在正常的文档流中，后面的元素层级比前面的元素层级高

定位的元素层级比没有定位的元素层级高

层叠上下文[^fn:3]

dom 元素在 z 方向的堆叠顺序问题

层叠上下文内部的元素，在其层叠上下文的 z 轴上按序排列

父元素创建了层叠上下文，其子元素的 z 基于其父元素

如何构建层叠上下文：

-   Root 元素 html
-   position 值非 static， z-index 非 auto 元素
-   opacity 非 1
-   filter, backdrop-filter,perspective, clip-path,mask / mask-image / mask-bordertransform 值非 none
-   flex 容器的子元素，z-index 值非 auto
-   grid 容器的子元素，z-index 值非 auto
-   其他...


### z-index {#z-index}

作用于非 position: static 的元素，也就是说值为 relative, absolute, fixed, sticky

在没有 z-index 时，元素的堆叠顺序为：

1.  root 元素的 背景和边框
2.  元素的没有定位的子元素，按其在 html 中的出现顺序
3.  浮动元素
4.  没定位的内联子元素
5.  定位的子元素，按其在 html 中的出现顺序

浮动元素层级在非定位元素和定位元素之间


## Margin collapse {#margin-collapse}

外边距重叠[^fn:4]

top, bottom 属性重叠，值为相对最大值，仅限垂直方向

display: flex 容器内没有重叠


## Composition layer {#composition-layer}


## 居中 {#居中}


## postcss {#postcss}

与 Less/Sass/Stylus 这一类预处理器类似，PostCSS 也能在原生 CSS 基础上增加更多表达力、可维护性、可读性更强的语言特性。两者主要区别在于预处理器通常定义了一套 CSS 之上的超集语言；PostCSS 并没有定义一门新的语言，而是与 @babel/core 类似，只是实现了一套将 CSS 源码解析为 AST 结构，并传入 PostCSS 插件做处理的流程框架，具体功能都由插件实现

> 预处理器之于 CSS，就像 TypeScript 与 JavaScript 的关系；而 PostCSS 之于 CSS，则更像 Babel 与 JavaScript。


## 伪元素，伪类 {#伪元素-伪类}


### 伪类 {#伪类}

选择器，选择特定状态下的元素，例如，:hover, :first-child, :last-child


### 伪元素 {#伪元素}

::before, 老代码里用单冒号，例如, ：before, 两种都是支持的

::first-line

```css
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}

```

::before, ::after 跟 content 属性结合,向文档中插入内容（插入文字对读屏器不友好，通常插入 icon)

> The use of the ::before and ::after pseudo-elements along with the content property is referred to as "Generated Content" in CSS


## 加载方式 {#加载方式}


## 属性继承 {#属性继承}

font-family, font-size, color, cursor, text-align, visibility, list-style 等


## 盒模型 {#盒模型}


## CSS 单位 {#css-单位}

-   px
-   em
-   rem
-   vw


## 响应式 {#响应式}


## inline-block {#inline-block}


## 定位 {#定位}


## 移动端 {#移动端}


## Flex {#flex}


## 字体图标 {#字体图标}


## 媒体查询 {#媒体查询}


## 常见问题 {#常见问题}

-   href vs src
    ```html
    <link href="style.css" rel="stylesheet" />
    <script src="script.js"></script>
    ```
    href: 声明关联(引用）资源地址，通过 rel 声明其类型和关系
    src: 声明外部资源的地址

-   link vs @import

    优先使用 link

    @import 阻塞并行下载，需要等 @import 的下载完再下载其他内容，变成了串行下载，不利于性能

[^fn:1]: [CSS小册](https://juejin.cn/book/7161370789680250917/section/7161370789768347685)
[^fn:2]: [Intro_to_formatting_contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts)
[^fn:3]: [The_stacking_context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
[^fn:4]: [Mastering_margin_collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)