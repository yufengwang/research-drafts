// 价格表, 索引代表钢条长度
const price = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

/**
 * 递归法
 * @param {number[]} p 价格表
 * @param {number} n 钢条长度
 * @returns {number} 最大利润
 * R(n) = Max(p(i) + R(n-i)) , 1 <= i <= n
 */
const cutRod = (p, n) => {
  if (n === 0) {
    return 0;
  }

  let res = 0;

  for (let i = 1; i <= n; i++) {
    // 第一刀长度为 i 时的利润
    const priceI = p[i] + cutRod(p, n - i);

    // 计算最大利润
    res = Math.max(res, priceI);
  }

  // 循环结束，返回最大利润
  return res;
};

/**
 * 记忆化递归法
 * @param {number[]} p 价格表
 * @param {number} n 钢条长度
 * @returns {number} 最大利润
 * R(n) = Max(p(i) + R(n-i)) , 1 <= i <= n
 */
const cutRodMemo = (p, n) => {
  const cache = [];

  const cutRod = (p, n) => {
    if (cache[n] >= 0) {
      return cache[n];
    }

    // 长度为 n 的钢条的最大利润
    let res = n === 0 ? 0 : -1;

    for (let i = 1; i <= n; i++) {
      // 第一刀长度为 i 时的利润
      const priceI = p[i] + cutRod(p, n - i);
      // 计算最大利润
      res = Math.max(res, priceI);
    }

    // 缓存起来
    cache[n] = res;

    return res;
  };

  return cutRod(p, n);
};

/**
 * 动态规划
 * @param {number[]} p 价格表
 * @param {number} n 钢条长度
 * @returns {number} 最大利润
 */
const cutRodDp = (p, n) => {
  const res = [0];
  // solution[i] 为长度为i的钢条第一次要切的长度
  const solution = [];

  for (let i = 1; i <= n; i++) {
    // 长度为 i 的钢条的最大利润初始值
    let revenue = -1;

    // 求切割长度为 i 的钢条的最大利润
    // 求子问题 i 的解
    for (let j = 1; j <= i; j++) {
      // 长度为 j 的钢条的利润
      const priceJ = p[j] + res[i - j];
      // 长度为 j 的钢条的最大利润
      // revenue = Math.max(revenue, priceJ);
      if (revenue < priceJ) {
        revenue = priceJ;
        // 长度为i的钢条，第一次切长度 j 为最优解
        solution[i] = j;
      }
    }

    // 长度为 i 时的最大利润
    res[i] = revenue;
  }

  return res[n];
};
