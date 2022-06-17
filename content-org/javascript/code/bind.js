function customFunction(fn, obj) {
  return function (...args) {
    fn.call(obj, ...args);
  };
}

const obj = {
  name: "foo",
};

function foo() {
  console.log(this.name);
  return this.name;
}

const bindFunction = customFunction(foo, obj);

bindFunction();
