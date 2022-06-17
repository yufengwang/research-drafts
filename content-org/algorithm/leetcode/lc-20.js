/**
 *
 * s = "()"
 * s = "()[]{}"
 * s = "(]"
 * s = "([)]"
 *
 * @param {*} s
 * @returns
 */
const isValid = function (s) {
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ]);
  // 奇数长度，直接return false
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  for (i = 0; i < s.length; i++) {
    // const ele = stack.pop();
    const stackLastEle = stack[stack.length - 1];
    if (map.get(s[i])) {
      // 左括号
      stack.push(s[i]);
    } else {
      // 右括号
      if (map.get(stackLastEle) === s[i]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  // 遍历结束，栈非空，false
  if (stack.length) {
    return false;
  }
  
  return true;
};
