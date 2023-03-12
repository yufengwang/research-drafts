//节流, 每隔一段时间执行一次
// 节流（Throttling）是指在一段时间内，无论事件触发了多少次，函数只会执行一次
// 例子： 滚动条滚动使，没必要响应每次滚动事件，每隔500ms响应一次即可
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

