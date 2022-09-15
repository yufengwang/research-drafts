+++
title = "Git"
author = ["wenhu"]
tags = ["git"]
draft = false
+++

## Git 原理 {#git-原理}

git 是一个内容可寻址文件系统，核心是一个简单的 key-value 存储

有向无环图


## .git 目录解读 {#dot-git-目录解读}


### HEAD {#head}

当前指针


### objects/ {#objects}

当前 repo 的所有对象存储

SHA-1 checksum of the content and its header


### refs/ {#refs}

所有指针


### index {#index}

暂存区


## Object 类型 {#object-类型}


### Tree object {#tree-object}

目录存储为 tree

A tree is a simple list of trees and blobs that the tree contains, along with the names and modes of those trees and blobs


### Blob object {#blob-object}

存储文件内容，文件 name 和 mode 不与 blob 一起存储


### Commit object {#commit-object}

包含下面这些内容

-   tree
-   author
-   committer
-   message
-   parent commit sha1 (如果有)


### Tag object {#tag-object}

针对某个 commit 的持久别名


### Branch {#branch}
