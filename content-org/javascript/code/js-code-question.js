const assert = function (condition, msg = "") {
  if (!condition) {
    console.log(msg);
  }
};

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

// 实现 bind
function customFunction(fn, obj) {
  return function (...args) {
    fn.call(obj, ...args);
  };
}

const bar = {
  name: "foo",
};

function foo() {
  console.log(this.name);
  return this.name;
}

const bindFunction = customFunction(foo, bar);

bindFunction();

// 实现 Object.create
function myCreate(proto) {
  const obj = {};
  obj.__proto__ = proto;
  return obj;
}

const s1 = "get-element-by-id"; // getElementById

function dashToCamel(str) {
    const reg = /-([a-z]{1})/i
    let result
    while(result = reg.exec(str)) {
        str = str.replace(result[0],  result[1].toUpperCase())
        console.log(result, str)
    }
    return str
}

// 数组去重
const arr = ["1", "1", "2", "3"];

function deDuplicate(arr) {
  return [...new Set(arr)];
}

const res = deDuplicate(arr);
console.log(res);

// JSON 类型对象深 copy
function deepClone(obj) {
  // Process null
  if (obj === null) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (let prop of Object.keys(obj)) {
    if (obj[prop] !== null && typeof obj[prop] === "object") {
      result[prop] = deepClone(obj[prop]);
    } else {
      result[prop] = obj[prop];
    }
  }
  return result;
}

// JSON 类型的深 copy
function klona(val) {
  var k, out, tmp;

  if (Array.isArray(val)) {
    out = Array((k = val.length));
    while (k--)
      out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
    return out;
  }

  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = {}; // null
    for (k in val) {
      if (k === "__proto__") {
        Object.defineProperty(out, k, {
          value: klona(val[k]),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      } else {
        out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
      }
    }
    return out;
  }

  return val;
}

/**
 * 2. 简单实现一个事件订阅机制，具有监听on和触发emit方法
 * 示例：
 * const event = new EventEmitter();
 * event.on('someEvent', (...args) => {
 *     console.log('some_event triggered', ...args);
 * });
 * event.emit('someEvent', 'abc', '123');
 */
class EventEmitter {
  constructor() {
    this.handler = {};
  }
  /* 功能实现 */
  on(event, fn) {
    if (!this.handler[event]) {
      this.handler[event] = [];
    }
    this.handler[event].push(fn);
  }
  emit(event, ...args) {
    if (this.handler[event]) {
      this.handler[event].forEach((handler) => handler.call(null, ...args));
    }
  }
}

const event = new EventEmitter();
event.on("someEvent", (...args) => {
  console.log("some_event triggered", ...args);
});
event.emit("someEvent", "abc", "123");


// i 控制台打印什么?
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

// 继承
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.foo = 'foo'

function Rectangle(params) {
  Shape.call(this);
  this.z = params;
}

Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

Object.setPrototypeOf(Rectangle, Shape)

const instance = new Rectangle(100);

// 数组拍平
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

// 保留三位小数
formatNumber(1234.56); // return '1,234.56'
formatNumber(123456789); // return '123,456,789'
formatNumber(1087654.321); // return '1,087,654.321'

function formatNumber(number) {
  let [interger, decimal] = number.toString().split(".");
  interger = interger.replace(/\d(?=(\d{3})+$)/g, "$&,");
  const res = decimal ? `${interger}.${decimal}` : interger;
  console.log(res);
  return res;
}

// generator
 const gen = () => {
  let val = 0;
  return {
    next: () => {
      return { value: val === 3 ? 3 : val++, done: val === 3 ? true : false };
    },
  };
};

const g = gen();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

// 实现 instanceof
function myInstanceOf(obj, proto) {
  let proto1 = obj.__proto__;
  const proto2 = proto.prototype;
  if (proto1 === proto2) {
    return true;
  }
  while (proto1 = proto1.__proto__) {
    if (proto2 === proto1) {
      return true;
    }
  }
  return false;
}

function A () {}
function B () {}

A.prototype  = new B
const a = new A

console.log(myInstanceOf(a, B))

// console.log(a instanceof null)
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

const obj1 = { a: 10, b: { x: 100, y: 200 } };
const obj2 = { a: 10, b: { x: 100, y: 200 } };

console.log(isEqual(obj1, obj2));
console.log(isEqual(NaN, NaN));

// 实现 new
function myNew(func, ...args) {
  const obj = {};
  obj.__proto__ = func.prototype;
  const res = func.call(obj, ...args);
  return res ? res : obj;
}

function A(a) {
  this.a = a;
}
const obj = myNew(A, "foo");

console.log(obj, obj instanceof A);


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

// 实现模板渲染引擎
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
  name: "姓名",
  age: 18,
};
const result = render(template, data); // 我是姓名，年龄18，性别undefined
console.log(result);

/**
 * @param {string} template
 */
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  let result;
  while ((result = reg.exec(template))) {
    // 注意，此处template被修改了，reg不能有g flag。不然reg的lastIndex跟template会对不上
    template = template.replace(result[0], data[result[1]]);
  }
  return template;
}
// 节流
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
// 防抖
function debounce(fn, time) {
  let timeout;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
// 交通信号灯
class TrafficLight {
  constructor() {
    this.states = [
      new Light("green", "GO"),
      new Light("red", "STOP"),
      new Light("yellow", "STEADY"),
    ];
    this.current = this.states[0];
  }
  sign() {
    return this.current.sign();
  }
  change() {
    const totalStates = this.states.length;
    const currentIdx = this.states.findIndex((light) => light === this.current);
    if (currentIdx < totalStates - 1) {
      this.current = this.states[currentIdx + 1];
    } else {
      this.current = this.states[0];
    }
  }
}

class Light {
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }
  sign() {
    console.log(this.type);
    return this.type;
  }
}

const trafficLight = new TrafficLight();

trafficLight.sign();
trafficLight.change();
trafficLight.sign();
trafficLight.change();
trafficLight.sign();
trafficLight.change();
trafficLight.sign();

export default {}