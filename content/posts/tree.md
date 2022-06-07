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

节点深度： 从根节点到当前节点的路径长度

节点层级： 节点depth + 1， （很少用）


## Height {#height}

节点高度： 从当前节点到叶节点的 **最长** **路径** 长度

树的高度： 根节点的高度


## Width {#width}

数在深度d的宽度： 树在深度 d 的节点数量

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


### Full {#full}


### BST {#bst}

Binary Search Tree，二叉搜索树

新增或删除节点时，需保持平衡，比较低效


### AVL {#avl}


### 2-3 {#2-3}


### B-Tree {#b-tree}


### Red-Black {#red-black}
