function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

const foo1 = {
  b: "1",
  a: 1,
  c: NaN,
  d: [
    {
      a: 1,
    },
  ],
  f: {
    a: 1,
  },
  g: [1, 2, 3],
};
const foo2 = {
  a: 1,
  b: "1",
  c: NaN,
  d: [
    {
      a: 1,
    },
  ],
  f: {
    a: 1,
  },
  g: {
    0: 1,
    1: 2,
    2: 3,
  },
  h: "h",
};

const obj1 = { a: 10, b: { x: 100, y: 200 } };
const obj2 = { a: 10, b: { x: 100, y: 200 } };

const isObj = (x) => typeof x === 'object' && x !== null

// 判断对象全等
// false first
const deepEqual = (foo, bar) => {
  if (foo === bar) {
    return true
  } else if (isObj(foo) && isObj(bar)) {
    // key 数量是否一致
    if (Object.keys(foo).length !== Object.keys(bar).length) {
      return false
    }
    for (const key of Object.keys(foo)) {
      if (Object.hasOwn(bar, key)) {
        return deepEqual(foo[key], bar[key])
      } else {
        return false
      }
    }
  } else {
    // 处理其他场景
    // 当 foo, bar 均为 NaN 时，返回 true，其他所有情况返回 false
    // true if both NaN, false otherwise
    return foo !== foo && bar !== bar
  }
}




export default {}