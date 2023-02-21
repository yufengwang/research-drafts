function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function isNaN1(obj) {
  return typeof obj === "number" && isNaN(obj);
}

function isEqual(obj1, obj2) {
  // NaN 跟 NaN 是相等的 虽然 NaN === NaN return false
  if (isNaN1(obj1) && isNaN1(obj2)) {
    return true;
  }
  // 任意一个参数为值类型则直接用 === 比较
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型
    return obj1 === obj2;
  }
  // 两个都是对象或数组，而且不相等
  const obj1key = Object.keys(obj1);
  const obj2key = Object.keys(obj2);

  // 对象属性长度不一致，直接return false
  if (obj1key.length !== obj2key.length) {
    return false;
  }

  // 遍历对象1，判断对象2跟对象1的某个key的值是否有不等的，有则return出false。
  for (let key of obj1key) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  // 遍历结束，没有找到值不等的属性，则俩对象相等。
  return true;
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

console.log(isEqual(foo1, foo2));
console.log(isEqual(obj1, obj2));
console.log(isEqual(NaN, NaN));

module.exports = isEqual;
