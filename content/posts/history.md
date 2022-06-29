+++
title = "history"
author = ["wenhu"]
date = 2022-06-29T13:13:00+08:00
tags = ["browser"]
draft = false
+++

## API {#api}

```js

class History {
  readonly length
  readonly state
  // 当跳转时，允许浏览器自动设置默认滚动恢复的行为
  scrollRestoration: 'auto'|'manual'
  back() {}
  forward() {}
  go() {}
/**
 * @param {object} state object 新 entry 的 state 对象，可被序列化，序列化后不超过 640 k
 * @param {string} title 文档标题，有兼容性问题，可直接设置为空字符串
 * @param {string} 新的 entry url，可为相对值，必需跟当前 url 同源，否则会抛异常
 *  e.g. history.pushState({foo: 'foo'}, 'title', '?page=1')
 */
  pushState() {}
  replaceState() {}
}
```

pushState 后当前页面并不会立马跳转至新的 url，仅当用户交互或 history 的 go/back/forward 方法调用时，页面才会跳转

pushState 也不会触发 popState 事件

pushState 的 url 如果是不同的 html，页面也不会重新 reload


## Popstate 事件 {#popstate-事件}

仅当页面有交互，popstate 事件才会被触发，如用户点击浏览器导航栏的前进后退箭头，或 history 的 go/back/forward 的方法调用

在 pageshow 事件触发后，在 hashchange 事件前

pageshow -&gt; popstate -&gt; hashchange

仅在单页 html 内 state 切换时触发


## Pageshow 事件 {#pageshow-事件}

文档内容通过页面导航后展示时触发，包括以下几个 case

1.  初始加载页面
2.  从另一个页面跳转过来
3.  移动端页面从后台切到前台
4.  通过浏览器的前进后退按钮回退到当前页

多页 html 切换时触发
