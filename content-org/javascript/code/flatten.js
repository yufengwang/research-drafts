function flatten(arr) {
  return arr.reduce(function (acc, cur) {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

function flatten2(input) {
  // make a shallow copy
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  //reverse to restore input order
  return res.reverse();
}

module.exports = { flatten, flatten2 };
