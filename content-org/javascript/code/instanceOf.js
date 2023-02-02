function myInstanceOf(obj, proto) {
  let proto1 = obj.__proto__;
  const proto2 = proto.prototype;
  if (proto1 === proto2) {
    return true;
  }
  while (proto1 = proto1.__proto__) {
    if (proto2 === proto1) {
      return true;
    }
  }
  return false;
}

function A () {}
function B () {}

A.prototype  = new B
const a = new A

console.log(myInstanceOf(a, B))

// console.log(a instanceof null)
