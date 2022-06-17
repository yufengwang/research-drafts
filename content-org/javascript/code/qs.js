/**
 * 1. 简单实现一个queryString，具有parse和stringify的能力，
 * parse，用于把一个URL查询字符串解析成一个键值对的集合。
 * 输入：查询字符串 'foo=bar&abc=xyz&abc=123'
 * 输出：一个键值对的对象
 * {
 *   foo: 'bar',
 *   abc: ['xyz', '123'],
 * }
 * stringify，相反的，用于序列化给定对象的自身属性，生成URL查询字符串。
 * 输入：一个键值对的对象
 * {
 *   foo: 'bar',
 *   abc: ['xyz', '123'],
 * }
 * 输出：查询字符串 'foo=bar&abc=xyz&abc=123'
 */

class queryString {
  constructor() {}
  parse(str) {
    const arr = str.split("&");
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i].split("=")[0];
      const val = arr[i].split("=")[1];
      if (obj[key]) {
        obj[key] = [].concat(obj[key]).concat(val);
      } else {
        obj[key] = val;
      }
    }
    return obj;
  }
  stringify(obj) {
    let str = "";
    for (let key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        let str1 = "";
        for (let val of obj[key]) {
          str1 += `${key}=${val}&`;
        }
        str += str1;
      } else {
        str += `${key}=${obj[key]}&`;
      }
    }
    return str.substr(0, str.length - 1);
  }
}

const str = "foo=bar&abc=xyz&abc=123";
const obj = {
  foo: "bar",
  abc: ["xyz", "123"],
};

const qs = new queryString();
const result = qs.parse(str);
const result1 = qs.stringify(obj);
console.log(result);
console.log(result1);

module.exports = str;
