/**
 *
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function (nums) {
  let res = [];
  // pojo {} 对象的 key 顺序默认是有序的，而 map 的key 顺序，是按其set的顺序来的
  // 所以这里使用 {} 而非 new Map()
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      // 根据题意，内层数组已经去重过
      const ele = nums[i][j];
      let count = map[ele];
      if (count > 0) {
        // 记录每个元素出现的次数
        map[ele] = ++count;
      } else {
        map[ele] = 1;
      }
    }
  }
  //   出现次数跟外层数组长度一致，即为交集中的元素
  Object.keys(map).forEach((el) => {
    if (map[el] === nums.length) {
      res.push(el);
    }
  });
  return res;
};
