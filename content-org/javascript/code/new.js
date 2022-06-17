function myNew(func, ...args) {
  const obj = {};
  obj.__proto__ = func.prototype;
  const res = func.call(obj, ...args);
  return res ? res : obj;
}

function A(a) {
  this.a = a;
}
const obj = myNew(A, "foo");

console.log(obj, obj instanceof A);

module.exports = myNew;
