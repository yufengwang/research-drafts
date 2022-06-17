/**
 * 动态规划
 * dp[i]: 以 i 结尾的 '连续' 子数组的 '最大' 和
 * dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
 *
 * i 要不要跟在 i- 1 后面形成连续 ?
 * 如果 dp[i- 1] < 0， 不跟，反之，则跟
 *
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
  // 状态数组
  const dp = [];
  const len = nums.length;
  // 题解, 初始值为数组的第一个元素的值
  let res = (dp[0] = nums[0]);
  for (let i = 1; i < len; i++) {
    // 求出 dp[i]
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    // 求 dp[i] 的最值, res 始终为最大的 dp[i] 的值，遍历结束，得到题解
    res = Math.max(res, dp[i]);
  }
  // 返回题解
  return res;
};

const maxSubArray1 = function (nums) {
  // 以 i 结尾的 连续子数组的 最大和
  let preMaxRes = nums[0];
  let curMaxRes;

  // 最终解
  let res = preMaxRes;

  const len = nums.length;

  // 从 1 开始遍历
  for (i = 1; i < len; i++) {
    // nums[i] 跟或不跟在前面的元素后，形成更大的连续子数组
    curMaxRes = Math.max(preMaxRes + nums[i], nums[i]);
    res = Math.max(res, curMaxRes);

    preMaxRes = curMaxRes;
  }

  return res;
};

/**
 * @param {number[]} nums
 */
const maxSubArray2 = function (nums) {
  // 前一个索引位置 连续子数组的 最大和
  let preMaxRes = nums[0];
  // 当前索引位置的 连续子数组 的 最大和
  let curMaxRes;

  // 最终的子数组的最大和
  let res = preMaxRes;

  // 左右指针
  let leftIdx = 0;
  let rightIdx = 0;

  const len = nums.length;

  // 从 1 开始遍历
  for (i = 1; i < len; i++) {
    if (preMaxRes < 0) {
      curMaxRes = nums[i];

      if (curMaxRes > preMaxRes) {
        leftIdx = i;
        rightIdx = i;
      }
    } else {
      curMaxRes = preMaxRes + nums[i];

      // 只移动右指针，当前解大于最优解时
      if (res < curMaxRes) {
        rightIdx = i;
      }
    }

    // 当前遍历到的数组的子数组的最大和
    res = Math.max(res, curMaxRes);

    preMaxRes = curMaxRes;
  }

  console.log(leftIdx, rightIdx);

  return { res, arr: nums.slice(leftIdx, rightIdx + 1) };
};
