+++
title = "树"
author = ["wenhu"]
date = 2022-06-01T00:08:00+08:00
tags = ["tree"]
draft = false
+++

## 定义 {#定义}

树： **连接的** **无向** **无环图**


## Path {#path}

路径： 节点和边的序列

路径长度； 路径里边的数量


## Depth {#depth}

节点深度： 从根节点到当前节点的 **路径** **长度**


## Level {#level}

节点层级：节点 depth + 1， （很少用）

树的层级：节点层级的最大值


## Height {#height}

节点高度： 从当前节点到 **叶节点** 的 **最长** **路径** **长度**

树的高度： 根节点的高度


## Width {#width}

树在深度 d 的宽度： 树在深度 d 的节点数量

树的宽度： 所有深度的最大宽


## Binary Tree {#binary-tree}

二叉树


### Balanced {#balanced}

平衡树的高度为 \\(O(log n)\\)


#### Height-Balanced {#height-balanced}

高度平衡，对任意节点而言，其子树的高度差 **最多** 为 1，空子树的高度为 -1


#### Weight-Balanced {#weight-balanced}

宽度平衡，对任意节点，其子树的 `内部节点` （不包括叶节点），数量差 **最多** 为 1，宽度平衡的树也是高度平衡的


### Complete {#complete}

完整二叉树，除最后一层外，每一层都是完整填满的，最后一层的节点尽可能 `靠左`


### Full {#full}

满二叉树，每一个节点都有 `0` 或 `2` 个子节点


### Perfect {#perfect}

完美二叉树，所有叶节点都在同一层的 **满二叉树** 或 每一层都填满的 **完整二叉树**


### BST {#bst}

Binary Search Tree，二叉搜索树

新增或删除节点时，需 **保持平衡** ，比较低效

特点：

1.  每个节点都有值
2.  每个节点的左子树的所有节点值都比当前节点的值要小
3.  每个节点的右子树的所有节点值都比当前节点的值要大

BST 不能包含重复值


### AVL {#avl}


### 2-3 {#2-3}


### B-Tree {#b-tree}


### Red-Black {#red-black}


### In order {#in-order}

中序遍历：

1.  左子树 (in order)
2.  根节点
3.  右子树 (in order)


### Pre order {#pre-order}

前序遍历：

1.  根节点
2.  左子树 (pre order)
3.  右子树 (pre order)


### Post order {#post-order}

后序遍历：

1.  左子树 (post order)
2.  右子树 (post order)
3.  根节点
