+++
title = "RxJs"
author = ["wenhu"]
date = 2022-09-08T23:10:00+08:00
tags = ["js"]
draft = false
+++

## rxjs {#rxjs}

流式编程库

流：时序，多值


### 使用场景 {#使用场景}

1.  时序，多值
2.  异步，事件，组合


### Observable {#observable}

可观察量，流

lazy Push collections of multiple values

懒推送的时序的多值的集合


### Observer {#observer}

观察者

消费 Observable


### Operators {#operators}

操作符

针对流的转换


### Subject {#subject}

特殊形式的 Observable，值允许多播给多个观察者


#### BehaviorSubject {#behaviorsubject}

保存最新的值，新订阅的 Observer 可拿到


#### ReplaySubject {#replaysubject}


#### AsyncSubject {#asyncsubject}


#### VoidSubject {#voidsubject}
