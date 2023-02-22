const assert = function (condition, msg = "") {
  if (!condition) {
    console.log(msg);
  }
};

/**
 * js 大数相加
 * 字符串拼接，用加法法则计算
 * @param { string } a
 * @param { string } b
 * @returns string
 */
function sumBigNumber(a, b) {
  let res = "",
    temp = 0;

  /** @type {string[]} */
  const arrA = a.split("");
  /** @type {string[]} */
  const arrB = b.split("");

  while (arrA.length || arrB.length || temp) {
    // ~~ 将操作数转换成 int, ~ bitwise not operator
    temp += ~~arrA.pop() + ~~arrB.pop();
    res = (temp % 10) + res;
    temp = temp > 9 ? 1 : 0;
  }

  return res.replace(/^0+/, "");
}


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


// ## 问题2 ================
// 对象深比较
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

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// object array NaN null
// 这个实现有点问题
function isEqual(target1, target2) {
  // console.log('foo', NaN === NaN)
  if (isNaN(target2) && isNaN(target1)) {
    return true;
  }
  if (isObject(target1) && isObject(target2)) {
    for (let key of Object.keys(target1)) {
      const val1 = target1[key];
      const val2 = target2[key];
      if (!Object.keys(target2).includes(key)) {
        return false;
      } else if (isObject(val1) && isObject(val2)) {
        return isEqual(val1, val2);
      } else {
        return val1 === val2;
      }
    }
  } else {
    return target1 === target2;
  }
}

console.log("ss", isEqual(foo1, foo2)); // false
console.log("aaa", isEqual(NaN, NaN)); // true

// ## 问题3  ===============

// 描述：

// 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如`110000000000000000000000000000000000000000000000`，
// 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
// 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。

// 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
// 示例输入：`"110010000000000000000000000000000000000000000000"`
// 示例输出：`["00:00~01:00", "02:00~02:30"]`

/**
 * 将48位的时间位图格式化成字符串
 *
 * @export
 * @param {string} bitmap 时间位图，110001010101001010000011110000111111111111111111
 * @return {Array<string>} 时间区间数组
 */
function timeBitmapToRanges(bitmap) {
  const res = [];
  const reg = /1+/g;
  let result;
  while ((result = reg.exec(bitmap))) {
    console.log(`Found ${result[0]} at position ${result.index}`);
    res.push(formatRes(result[0].length, result.index));
  }
  return res;
}

function formatRes(len, startIdx) {
  // 每一位对应的时间起点时刻
  // const map = {
  //   0: "00: 00",
  //   1: "00: 30",
  //   2: "01: 00",
  //   3: "01: 30",
  //   4: "02: 00",
  //   5: "02: 30",
  //   20: "10: 00",
  //   21: "10: 30",
  //   46: "23: 00",
  //   47: "23: 30",
  // };
  const start = getString(startIdx);
  const end = getString(startIdx + len);
  return `${start} ~ ${end}`;
}

function getString(startIdx) {
  const start =
    startIdx % 2 === 0
      ? `${startIdx >= 20 ? startIdx / 2 : "0" + startIdx / 2}:00`
      : `${startIdx - 1 >= 20 ? (startIdx - 1) / 2 : "0" + (startIdx - 1) / 2
      }:30`;
  return start;
}

console.log(
  timeBitmapToRanges("110010000000000000000000000000000000000000000011")
);

// console.log(timeBitmapToRanges('110001010101001010000011110000111111111111111111'))


/**
 * ## 问题1
 * 解析url中的queryString
 *
 * 输入：https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D
 * 输出：
 * {
 *  name: "coder",
 *  age: "20",
 *  callback: "https://youzan.com?name=test",
 *  list: ["a", "b"],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  }
 * }
 */

const parseQs = (str) => {
  // 最终返回的对象
  const res = {}
  // 拆原字符串
  const arr = str.split('?')[1].split('&')
  // 遍历数组
  for (let ele of arr) {
    let arr1 = ele.split('=')
    // decode 下
    let val = decodeURIComponent(arr1[1])
    // 处理值
    try {
      val = JSON.parse(val)
    } catch { }
    // 处理key
    if (/\[\]$/.test(arr1[0])) {
      let key = arr1[0].match(/\w+/)[0]

      if (res[key]) {
        res[key].push(val)
      } else {
        res[key] = [val]
      }

    } else {
      res[arr1[0]] = val
    }

  }
  return res

}
let str = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D'
console.log(parseQs(str))

/**
   * 问题 2
   * 将一个json数据的所有key从下划线改为驼峰
   *
   * @param {object | array} value 待处理对象或数组
   * @returns {object | array} 处理后的对象或数组
   */

const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: {
    s: 2,
    s_d: 3,
  },
  a_f: [
    1,
    2,
    3,
    {
      a_g: 5,
    },
  ],
  a_d_s: 1,
};


const parseObj = (json) => {
  const toCamel = (str) => {
    return str.replace(/_([a-z])/g, function (match, p1) {
      return p1.toUpperCase()
    })
  }
  const isPrimtive = (val) => {
    return typeof val !== 'object'
  }

  const parse = (obj) => {
    let res = Array.isArray(obj) ? [] : {}
    for (let [key, val] of Object.entries(obj)) {
      if (/_/.test(key)) {
        res[toCamel(key)] = isPrimtive(val) ? val : parse(val)
      } else {
        res[key] = isPrimtive(val) ? val : parse(val)
      }
    }
    return res
  }

  return parse(json)

}

function timeBitmapToRanges(bitmap) {
  const ranges = []
  let i = 0;
  while (i < bitmap.length) {
    // 找 0 
    if (bitmap[i] === '0') {
      i++;
      continue
    }
    let range = { start: i, end: i };
    // 找 1
    while (bitmap[i] === '1') {
      range.end = i;
      i++;
    }
    ranges.push(range)
  }
  /**
  * 0 => 00:00 ~ 00:30
  * 1 => 00:30 ~ 01:00
  * 2 => 01:00 ~ 01:30
  * 3 => 01:30 ~ 02:00
  * 4 => 02:00 ~ 02:30
  * 找规律，通过数字格式化成字符串
  */
  const format = (range) => {
    const { start, end } = range
    const isOdd = num => num % 2 === 1
    const hour = Math.floor(start / 2)
    const endHour = Math.ceil(end / 2)
    const time = `${hour < 10 ? '0' : ''}${hour}` + ':' + `${isOdd(hour) ? '30' : '00'}`
    const time1 = `${endHour < 10 ? '0' : ''}${endHour}` + ':' + `${isOdd(endHour) ? '00' : '30'}`
    // console.log(time, time1)
    return `${time}~${time1}`
  }
  const res = ranges.map(el => format(el))
  console.log(ranges, res)
  return res
}

/**
 * 1、实现一个set函数来更新对象中任意路径的值
 * 
 * set(object, path, value)
 */
const object = { 'a': [{ 'b': { 'c': 3 } }] };
console.log(object.a[0].b.c); // => 4
const format = (str) => {
  return str.replace(/\[(\d)\]/g, function (match, p) {
      return `.${p}`
  }).replace(/^\./, '')
}
const deepSet = (obj, path, val) => {
  // 处理path, 移除[],改成 用 . 分割的格式
  const str = format(path)
  const arr = str.split('.');
  console.log('arr',str, arr)
  let target = obj, key = arr[arr.length - 1]
  for (let i = 0; i < arr.length - 1; i++) {
      target = target[ arr[i] ]
  }
  console.log('target', target, key)
  target[key] = val
}
deepSet(object, 'a[0].b.c', 4);

/**
 * 2、实现一个方法memoize 来缓存函数执行结果
 * 要求: 相同输入的情况下避免重复执行
 */
// const values = _.memoize(()=>{xxx})
// values(object); => valuea
// values(arg1, arg2); => valueb

//数组去重，含对象、NaN、symbol
//1. 数组扁平化

//2. 实现一个函数,大致的意思是，根据路径输出对象或数组当中的值
const obj = { a: [{ b: { c: 3 } }] }, path1 = 'a[0].b.c'
const arr = [{ a: { b: [{ c: 1 }] } }], path2 = '[0].a.b[0].c'
const deepGet = (obj, path) => { }

deepGet(obj, path1)//输出3
deepGet(arr, path2)//输出1 */

/*const array = [1.1,1.2,2.3,2.2,3.1]
const groupBy = (array, fn)
// test: groupBy(array, Math.floor) => { 1: [1.1, 1.2], 2: [2.3, 2.2], 3: [3.1] } */

// ******************** 题目 3 ********************
/**
 * 数组去重
 *
 * @example
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {b: 2, a: 1}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 */
function unique(arr) {
  let res = [],
    objVal = {};
  arr.forEach((ele) => {
    if (typeof ele === "string" || typeof ele === "number") {
      if (!res.includes(ele)) {
        res.push(ele);
      }
    } else if (ele instanceof Object) {
      if (!objVal[JSON.stringify(ele)]) {
        res.push(ele);
        objVal[JSON.stringify(ele)] = ele;
      }
    } else if (Array.isArray(ele)) {
      unique(ele);
    }
  });
  return res;
}
console.log(unique([1, "1", 1]));
console.log(unique([{ a: 1 }, { b: 1 }, { a: 1 }]));
console.log(unique([{ a: 1, b: 2 }, { b: 1 }, { a: 1, b: 2 }]));
console.log(unique([[1, { a: 1 }], [2], [3], [1, { a: 1 }]]));

/**
 * 对象属性深取值
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
  const array = [{ "a": { b: [1] } }];
  getValue(object, 'a[0].b.c') // 输出 3
  getValue(array, '[0].a.b[0]') // 输出 1
 */

const getValue = (obj, path) => {

  const format = (str) => {
    return str.replace(/\[(\d)\]/g, function (match, p) {
      return `.${p}`
    }).replace(/^\./, '')
  }
  // 处理path, 移除[],改成 用 . 分割的格式
  const str = format(path)
  console.log(str)
  const arr = str.split('.')
  let res = obj;

  // 遍历下依次取属性获取最终解
  arr.forEach((ele) => {
    res = res[ele]
  })

  console.log('res', res)

  return res;
}


export default {}