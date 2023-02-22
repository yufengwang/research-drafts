//节流, 每隔一段时间执行一次
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
// 例子：用户在 input 框输入，一段时间没有输入后，再发起网络请求
function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}

