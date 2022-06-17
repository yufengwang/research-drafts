/**
 * 解题思路，滑动窗口
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const len = s.length;

  // 用于记录元素的最新索引
  const map = new Map();

  // 返回值，默认给0，因为可能输入为空字符串
  let ans = 0;
  // 左窗口的索引
  let left = 0;

  // 从第一个元素开始遍历
  for (let i = 0; i < len; i++) {
    // 判断当前元素是否出现过
    const idx = map.get(s[i]);

    if (idx >= 0) {
      // 调整左窗口的位置，这里取最值是为了防止左指针回退，例如 abba 这种字符串
      left = Math.max(left, idx + 1);
    }

    // 求最值
    ans = Math.max(ans, i - left + 1);
    // 记录当前遍历元素的最新位置
    map.set(s[i], i);
  }

  return ans;
};
