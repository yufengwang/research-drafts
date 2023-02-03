function foo(n) {
  // 记住其创建时的词法环境，称之为闭包
  return function () {
    console.log(n);
  };
}

const f = foo(1);
const f1 = foo(2);
f()
f1()

module.exports = {}