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

function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}

