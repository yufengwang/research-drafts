//节流, 每隔一段时间执行一次
// 节流（Throttling）是指在一段时间内，无论事件触发了多少次，函数只会执行一次
// 例子： 滚动条滚动使，没必要响应每次滚动事件，每隔500ms响应一次即可
// 使用定时器的节流函数在第一次触发时不会执行，而是在 delay 秒之后才执行，当最后一次停止触发后，还会再执行一次函数
function throttle(fn, time) {
  let timer;
  return function () {
    if (timer) {
      return;
    }
    let func = () => {
      fn.apply(this, arguments);
      timer = null;
    };
    timer = setTimeout(func, time);
  };
}

// func是用户传入需要防抖的函数
// wait是等待时间
// 使用时间戳的节流函数会在第一次触发事件时立即执行，以后每过 wait 秒之后才执行一次，并且最后一次触发事件不会被执行
const throttle1 = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function(...args) {
    // 当前时间
    let now = +new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}
// 防抖（Debouncing）是指在事件触发后，等待一段时间后才执行函数。如果在这段时间内，事件又被触发，则重新计时，等待一定时间后再执行函数
// 防抖，例子：用户在 input 框输入，一段时间没有输入后，再发起网络请求
function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(func, time);
  };
}
/* 
总结：
函数防抖：限制执行次数，多次密集的触发只执行一次
将几次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
函数节流：限制执行的频率，按照一定的时间间隔有节奏的执行
使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

*/
