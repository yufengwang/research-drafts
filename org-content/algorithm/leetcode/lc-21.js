/**
 * 合并两个有序链表
 *
 * 思路: 递归
 *
 * l1:  4 -> 5 -> 7
 *
 * l2:  0 -> 3 -> 5
 * ----------------
 * l1:  4 -> 5 -> 7
 *
 * l2:  0 -> 3 -> 5
 *
 * 证明： 如何证明算法的正确性
 *
 * 时间复杂度  O(?)
 * 空间复杂度 O(?)
 *
 * @param {LinkedListNode} l1
 * @param {LinkedListNode} l2
 * @returns {LinkedListNode}
 **/

const mergeTwoLists = (l1, l2) => {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l2;
  }
  if (l1.val < l2.val) {
    // 递归找到剩下节点的头节点
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    // 递归找到剩下节点的头节点
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
