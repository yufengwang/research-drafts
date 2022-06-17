/**
 * 二叉树层序遍历
 */

function levelOrder(root) {
  const queue = [];
  // 最终的返回结果
  const res = [];
  if (!root) {
    return [];
  }
  queue.push(root);

  while (queue.length) {
    // 记录每一层的元素
    const level = [];
    // 记录当前队列的长度
    const len = queue.length;
    // 遍历每一层
    for (let i = 0; i < len; i++) {
      const ele = queue.shift();
      level.push(ele.val);
      if (ele.left) {
        queue.push(ele.left);
      }
      if (ele.right) {
        queue.push(ele.right);
      }
    }
    // 遍历结束，将每一层的数组放在返回值里
    res.push(level);
  }
  return res;
}
