'use strict'
const obj = {
  value: 1,
  func1: function () {
    console.log(this.value);
  },
  func2: () => console.log(this),
};

const obj2 = {...obj, value: 2}

obj2.func1()
obj2.func2()

module.exports = obj