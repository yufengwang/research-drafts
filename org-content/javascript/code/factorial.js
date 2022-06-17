function factorial(n) {
  if (n === 1) {
    return n;
  }
  return n * factorial(n - 1);
}

function factorial2(n) {
  return loop(1, 1, n);
}

function loop(product, count, maxCount) {
  if (count > maxCount) {
    console.log("return", product);
    return product;
  }
  return loop(product * count, count + 1, maxCount);
}

function fib(n) {
  return fibHelper(1, 0, n);
}

function fibHelper(sum, result, count) {
  if (count === 0) {
    return result;
  }
  return fibHelper(sum + result, sum, count - 1);
}
