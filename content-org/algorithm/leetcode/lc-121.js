/**
 * 买卖股票的最佳时机
 * dp[i] = max{dp[i-1], price(i) - minPrice}
 * test cases: [7,6,4,3,1]
 * @returns {number}
 **/
const maxProfit = function (prices) {
  let res = 0;
  // 历史最低点
  let minPrice = prices[0];
  // let minPrice = Number.MAX_SAFE_INTEGER;
  const len = prices.length;
  for (let i = 0; i < len; i++) {
    const todayPrice = prices[i];
    const todayMax = todayPrice - minPrice;
    if (todayPrice < minPrice) {
      // 跌了，重置历史最低点
      minPrice = todayPrice;
    } else if (todayMax > res) {
      // 今天的假想最大利润
      res = todayMax;
    }
  }
  return res;
};

/**
 * @param {number[]} prices
 *
 * test cases: [7,1,5,3,6,4]
 * 2022/5/18 23:30 解
 */
const maxProfit1 = function (prices) {
  let maxProfit = 0;
  let lowestPrice = prices[0];
  const len = prices.length;

  for (let i = 1; i < len; i++) {
    maxProfit = Math.max(prices[i] - lowestPrice, maxProfit);

    lowestPrice = Math.min(lowestPrice, prices[i]);
  }

  return maxProfit;
};
