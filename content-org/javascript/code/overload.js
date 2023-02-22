// js不支持函数重载，后定义的函数会覆盖先定义的函数，并不会根据参数的个数判断要去执行哪个函数
function funcONE(x, y) {
  return x * y;
}

function funcONE(z) {
  return z;
}

// prints 5
funcONE(5);

// prints 5, not 30
funcONE(5, 6);

export default {}