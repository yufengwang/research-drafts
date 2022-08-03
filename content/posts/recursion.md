+++
title = "递归"
author = ["wenhu"]
date = 2022-07-24T15:57:00+08:00
tags = ["plt"]
draft = false
+++

## 递归 {#递归}

```racket
(define (sum n)
  (if (zero? n)
      0
      (+ n (sum (- n 1))))) ; not tail recursive
```


## 尾递归 {#尾递归}

```racket
(define (tail-sum n [acc 0])
  (if (zero? n)
      acc
      (tail-sum (- n 1) (+ n acc)))) ; tail recursive
```
