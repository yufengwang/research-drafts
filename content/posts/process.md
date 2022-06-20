+++
title = "进程"
author = ["wenhu"]
date = 2022-06-20T23:20:00+08:00
tags = ["os"]
draft = false
+++

## 定义 {#定义}

进程：操作系统对运行态的程序的抽象


### Machine state {#machine-state}

进程的机器状态

包括：内存地址空间，寄存器，program counter, stack pointer, frame pointer, i/o 文件描述符


#### 地址空间 {#地址空间}

进程能访问到的内存地址


#### Program counter: {#program-counter}

程序计数器，指令指针 (instruction pointer)，指向正在执行中的指令


## Time sharing {#time-sharing}

分时共享：A 用一会儿，B 用一会儿


## Space sharing {#space-sharing}

空间共享：例如磁盘空间，A，B 文件占用的是不同的存储块
