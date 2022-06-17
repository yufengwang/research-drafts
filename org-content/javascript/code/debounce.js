function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
