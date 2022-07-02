+++
title = "orgmode 语法"
author = ["wenhu"]
date = 2022-06-29T16:35:00+08:00
tags = ["orgmode"]
draft = false
+++

用来测试 orgmode 转 markdown 经 hugo 渲染后的效果


## Table {#table}

| 表头             | 表头              |
|----------------|-----------------|
| 内容 e nglish    | 内容              |
| 你 cool 好了 end 我是 | happy ending 我是中文 |


## Math {#math}

If \\(a^2=b\\) and $ b=2 $, then the solution must be
either \\[ a=+\sqrt{2} \\] or \\[ a=-\sqrt{2} \\].

\begin{equation}
x=\sqrt{b}
\end{equation}


## Test footnode {#test-footnode}

This is a content[^fn:1]

[^fn:1]: this is a footnote
