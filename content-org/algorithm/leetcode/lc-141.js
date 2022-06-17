/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  if (head === null) {
    return false;
  }
  const set = new Set();
  while (head.next !== null) {
    if (set.has(head)) {
      return true;
    } else {
      set.add(head);
      head = head.next;
    }
  }
  return false;
}

function hasCycle1(head) {
  if (head === null || head.next === null) {
    return false;
  }
  try {
    JSON.stringify(head);
    return false;
  } catch {
    return true;
  }
}

/**
 * 快慢指针
 */
function hasCycle2(head) {
  if (!head || !head.next) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (fast !== slow) {
    if (!fast || !fast.next) {
      return false;
    }
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
}

const head = new ListNode(2);
head.next = new ListNode(2);
head.next.next = new ListNode(1);
hasCycle(head);

module.exports = hasCycle;
