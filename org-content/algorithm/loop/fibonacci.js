/**
 * 计算第n个 fibonacci数
 * @param {number} n
 */
function getFibNum(n) {
  let back2 = 0;
  let back1 = 1;
  let next = null;
  if (n === 0) {
    return 0;
  }
  for (let i = 2; i < n; i++) {
    next = back2 + back1;
    back2 = back1;
    back1 = next;
  }
  return back1 + back2;
}

const res = getFibNum(6);
console.log(res);
