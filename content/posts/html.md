+++
title = "HTML"
author = ["wenhu"]
date = 2023-02-17T11:04:00+08:00
tags = ["browser"]
draft = false
+++

待补充...


## Web components {#web-components}


## Shadow dom {#shadow-dom}


## Dom api {#dom-api}

-   document.querySelectorAll(selectors)


## 动画 {#动画}


## MessageChannel {#messagechannel}

用于通信场景，例如 两个 iframe, 主文档和其中嵌入的 iframe,  两个文档通过 SharedWorker 通信, 两个 Worker

Message channels 可以提供一个安全通道，允许开发者在不同的浏览上下文中传递数据


### 实例属性 {#实例属性}

-   MessageChannel.port1

    返回 channel 的端口1
-   MessageChannel.port2

    返回 channel 的端口2


### 示例 {#示例}

主文档：

```js
const input = document.getElementById("message-input");
const output = document.getElementById("message-output");
const button = document.querySelector("button");
const iframe = document.querySelector("iframe");

const channel = new MessageChannel();
const port1 = channel.port1;

// Wait for the iframe to load
iframe.addEventListener("load", onLoad);

function onLoad() {
  // Listen for button clicks
  button.addEventListener("click", onClick);

  // Listen for messages on port1
  port1.onmessage = onMessage;

  // Transfer port2 to the iframe
  // The contentWindow property returns the Window object of an HTMLIFrameElement.
 /* 参数1： The message being sent. For this initial port transferring this message could be an empty string but in this example it is set to 'init'.
    参数2： The origin the message is to be sent to. * means "any origin".
    参数3： An object, the ownership of which is transferred to the receiving browsing context. In this case, we are transferring MessageChannel.port2 to the IFrame, so it can be used to communicate with the main page. */
  iframe.contentWindow.postMessage("init", "*", [channel.port2]);
}

// Post a message on port1 when the button is clicked
function onClick(e) {
  e.preventDefault();
  port1.postMessage(input.value);
}

// Handle messages received on port1
function onMessage(e) {
  output.innerHTML = e.data;
  input.value = "";
}


```

iframe:

```js
const list = document.querySelector("ul");
let port2;

// Listen for the initial port transfer message
window.addEventListener("message", initPort);

// Setup the transferred port
function initPort(e) {
  port2 = e.ports[0];
  port2.onmessage = onMessage;
}

// Handle messages received on port2
function onMessage(e) {
  const listItem = document.createElement("li");
  listItem.textContent = e.data;
  list.appendChild(listItem);
  port2.postMessage(`Message received by IFrame: "${e.data}"`);
}


```


## 事件 {#事件}

-   DOMContentLoaded
