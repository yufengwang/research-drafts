+++
title = "RxJs"
author = ["wenhu"]
date = 2022-09-08T23:10:00+08:00
tags = ["js"]
draft = false
+++

## RxJs {#rxjs}

流式编程库

1.  时序，多值
2.  异步，事件，组合


## Observable {#observable}

可观察量，流

lazy Push collections of multiple values

懒推送的时序的多值的集合


### Higher-Order Observables {#higher-order-observables}


## Observer {#observer}

观察者

消费 Observable


## Operators {#operators}

操作符

针对流的转换


### concatAll {#concatall}

按序订阅。串行


### switchAll {#switchall}

仅订阅最新。 花心


### mergeAll {#mergeall}

同时，并发订阅。并发


### exhaustAll {#exhaustall}

仅订阅当前至其结束，期间丢弃新的。 专一


### switchMap {#switchmap}

map + switchAll

订阅切换，新订阅来值时，取消老订阅。


### mergeMap {#mergemap}

map + mergeAll


### concatMap {#concatmap}

把每个值映射为 observable，然后使用 concatAll 扁平化所有内部 observable
map + concatAll


### exhaustMap {#exhaustmap}

map + exhaustAll。


## Subject {#subject}

特殊形式的 Observable，值允许多播给多个观察者


### BehaviorSubject {#behaviorsubject}

保存最新的值，新订阅的 Observer 可拿到


### ReplaySubject {#replaysubject}


### AsyncSubject {#asyncsubject}


### VoidSubject {#voidsubject}


## 异常处理 {#异常处理}

流 要么异常，要么给值后完成


### catchError {#catcherror}

1.  catch and replace
2.  catch and rethrow


### finalize {#finalize}

跟 js的 final 关键字类似，无论异常或非异常都会执行，用于释放资源


### retry {#retry}


#### notification observable {#notification-observable}

仅当 notification observable emit 值时，input observable 会被重新订阅
