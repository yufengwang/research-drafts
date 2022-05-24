+++
author = ["wenhu"]
draft = false
+++

## Linked Lists {#linked-lists}

链表


### Singly linked list {#singly-linked-list}

单链表

-   删除节点 O(n)


#### 时间复杂度 {#时间复杂度}

| Access | Search | Insertion | Deletion |
|--------|--------|-----------|----------|
| O(n)   | O(n)   | O(1)      | O(n)     |

注： 插入操作仅为在给定节点 Node 的指针 P 的前提下，在其后面插入一个节点，此时复杂度为 O(1)，若在 P 前面插入一个节点，则复杂度为 O(n), 因为需要遍历


### Doubly linked list {#doubly-linked-list}

双链表


#### 优点： {#优点}

-   可以双向遍历
-   删除操作更高效(O(1))，在已知给定节点的指针的前提下
-   插入操作 (O(1))


#### 缺点： {#缺点}

-   额外的空间开销，用来存指针
-   所有操作需要维持两个指针的指向


#### 时间复杂度 {#时间复杂度}

| Access | Search | Insertion | Deletion    |
|--------|--------|-----------|-------------|
| O(n)   | O(n)   | O(1)      | O(n) / O(1) |
