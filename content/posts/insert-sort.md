+++
title = "插入排序"
author = ["wenhu"]
date = 2022-06-10T12:28:00+08:00
tags = ["sort"]
draft = false
+++

## 插入排序 {#插入排序}

时间复杂度 \\( O(n^2 \\)

```js

const insertSort = (arr) => {
  const len = arr.length

  // 从第二个元素开始遍历
  for  (let i = 1; i < len; i ++ ) {

    const ele = arr[i]

    // 索引i位置的值依次跟前面的元素比
    for (let j = i - 1; j >= 0; j --) {

      const  cur =  arr[j]
      const  next = arr[j + 1]

      if(cur < ele) {
        break
      }

      arr[j] =  next
      arr[j+1] = cur
    }

  }

  return arr
}

```
