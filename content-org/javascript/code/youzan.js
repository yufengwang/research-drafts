// ## 问题 1 ==============
// 大数加法
// 注意js里整型会溢出
function add(str1, str2) {
  const res = (Number(str1) + Number(str2)).toString();
  return res;
}

const assert = function (condition, msg = "") {
  if (!condition) {
    console.log(msg);
  }
};

assert(add("123", "321") === "444", "use case 1 fail");
assert(add("11", "99") === "110", "use case 2 fail");
assert(add("1233345", "321") === "1233666", "use case 3 fail");
assert(
  add("9977788965454533", "32177777777") === "9977821143232310",
  "use case 4 fail"
);

// ## 问题2 ================
// 对象全等
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
    return str.replace(/_(\w)/g, function (match, p1) {
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

console.log(parseObj(testData), testData)