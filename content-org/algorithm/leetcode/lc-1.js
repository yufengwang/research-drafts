/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const idx = map.get(complement);
    if (idx === undefined) {
      map.set(nums[i], i);
    } else {
      return [idx, i];
    }
  }
  return [];
};
