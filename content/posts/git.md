+++
title = "Git"
author = ["wenhu"]
tags = ["git"]
draft = false
+++

## Git 原理 {#git-原理}

git 是一个内容可寻址文件系统，核心是一个简单的 key-value 存储


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


### Tree {#tree}


### Blob {#blob}
