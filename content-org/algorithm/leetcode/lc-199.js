/**
 * 二叉树的右视图
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  // 最终返回值
  const res = [];
  // 临时队列
  const queue = [];
  // 处理边界条件
  if (!root) {
    return [];
  }
  // 向队列添加根节点
  queue.push(root);
  while (queue.length) {
    // 当前队列的长度
    const len = queue.length;
    // 当前层
    const level = [];
    // 遍历每一层
    for (let i = 0; i < len; i++) {
      const ele = queue.shift();
      level.push(ele);
      if (ele.left) {
        queue.push(ele.left);
      }
      if (ele.right) {
        queue.push(ele.right);
      }
    }
    res.push(level[level.length - 1].val);
  }
  return res;
};
