+++
title = "Interpreter"
author = ["wenhu"]
date = 2022-12-12T14:19:00+08:00
tags = ["plt"]
draft = false
+++

## Overview {#overview}


## Scanning {#scanning}

Source Code -&gt; Token

词法分析，将源代码的一坨字符串变成有意义的 token 串


## Parsing {#parsing}

Token -&gt; AST


## IR {#ir}

intermediate representation


## Code generation {#code-generation}


## Bytecode {#bytecode}

p-code: portable code

Each instruction is often a single byte(8 bits) long

供虚拟机执行的代码(指令)，而不是真正的机器码，由虚拟机去抹平不同cpu架构的差异


## Virtual machine {#virtual-machine}

执行 bytecode


## Interpreter {#interpreter}


## Transpiler {#transpiler}

转译器，例如各种转译为 javascript 的语言


## Just in time {#just-in-time}
