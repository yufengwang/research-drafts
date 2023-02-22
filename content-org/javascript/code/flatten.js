// 递归
function flatten(arr) {
  return arr.reduce(function (acc, cur) {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

// 循环
function flatten2(input) {
  // make a shallow copy
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      // 这里解构掉，再 push 进去
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  //reverse to restore input order
  // 保持输出顺序
  return res.reverse();
}

export default {}
