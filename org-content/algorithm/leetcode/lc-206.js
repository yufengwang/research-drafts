/**
 * 反转链表递归法
 * 原链表： 1 -> 2 -> 3 -> NULL
 * 反转后链表： 3 -> 2 -> 1 -> NULL
 * @param {LinkedListNode} head
 */
const reverseLinkedList = (head) => {
  // 处理边界条件，空链表或只有一个节点的链表无需反转，直接返回
  if (head === null || head.next === null) {
    return head;
  }
  // 入栈找到反转后的链表的头结点
  const cur = reverseLinkedList(head.next);

  // 出栈时调整指针指向
  head.next.next = head;
  head.next = null;

  return cur;
};

/**
 * 递归调用过程
 *
 * 2入栈  reverseLinkedList(3)  head = 3; return 3;  2出栈
 *       |
 * 1入栈  reverseLinkedList(2)  head = 2 ; return 3 ; 1出栈
 *       |
 * 0入栈  reverseLinkedList(1)   head = 1 ; return 3 ;  0出栈
 *
 */

/**
 * 双指针反转链表
 */
const reverseList = (head) => {
  // 初始态
  // 后指针指向 null
  let back = null;

  // 当前指针指向链表头
  let cur = head;

  while (cur) {
    // 开始遍历，保存前指针的下一个节点
    const next = cur.next;
    // 完成一次翻转
    cur.next = back;
    // 后指针前进
    back = cur;
    // 前指针前进
    cur = next;
  }

  // 注意这里要： 返回后指针
  return back;
};
