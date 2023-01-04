+++
title = "快速排序"
author = ["wenhu"]
date = 2022-06-14T14:00:00+08:00
tags = ["sort"]
draft = false
+++

## 思想 {#思想}

分治 + 递归


## 步骤 {#步骤}

1.  选定参考元素 p (例如最右侧元素)
2.  遍历数组，将比参考元素小的元素都挪到左边，并记录元素数量
3.  遍历结束，数组分为 &lt;= p | &gt;p | p
4.  将 p 移到中间 &lt;=p | p | &gt;p
5.  返回中间的索引
6.  递归处理 &lt;=p 部分
7.  递归处理 &gt;p 部分
8.  排序结束


## 实现 {#实现}

```js

/**
 * 数组分割
 */
const partition = (arr, p, r) => {
  // 选数组最后一个元素为分割点
  const pivot = arr[r];
  let i = p - 1;

  // 遍历，将比分割点小的元素都挪到左边
  for (let j = p; j < r; j++) {
    if (arr[j] <= pivot) {
      i++;
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  // 将分割点的元素挪到左右数组中间
  const tmp = arr[i + 1];
  arr[i + 1] = pivot;
  arr[r] = tmp;

  // 返回分割点的索引
  return i + 1;
};


/**
 * 快速排序
 */
const quickSort = (arr, p, r) => {
  // p < r 时，数组中不止一个元素，需要排序，否则无需排序
  if (p < r) {
    // 数组分割，找出分割点索引，分割点左侧的值都不大于分割点，右侧的值都大于分割点
    const pivotIdx = partition(arr, p, r);
    // 快排左右两侧的子数组，注意这俩子数组里均不包含 pivotIdx
    // 左数组快排
    quickSort(arr, p, pivotIdx - 1);
    // 右数组快排
    quickSort(arr, pivotIdx + 1, r);
  }

  return arr;
};

const arr = [2, 8, 7, 1, 3, 5, 6, 4];

export { quickSort };

```


## 分析 {#分析}

时间复杂度： O(nlogn)
