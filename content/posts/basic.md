+++
title = "JavaScript 基础"
author = ["wenhu"]
date = 2023-02-02T13:58:00+08:00
categories = ["js"]
draft = false
+++

## Var {#var}

only a variable's declaration is hoisted, not its initialization

var 的变量声明会被提升，变量赋值及初始化不会


## Function {#function}


## Lexical Environment {#lexical-environment}

运行中的函数，代码块，脚本全局都有与之对应的 LE

词法环境对象，包括两部分:

1.  Environment Record 环境记录对象，保存局部变量，this 信息
2.  指向外层词法环境的指针

A variable is a property of a special internal object, associated with the currently executing block/function/script
