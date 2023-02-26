// i 控制台打印什么?
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

// 问输出顺序
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

// 问打印顺序
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 0
// 1
// 4
// 2
// 3
// 5
// 6

// 问输出顺序
const p = new Promise((resolve) => {
  console.log(0);
  resolve();
});
p.then((res) => {
  console.log(1);
})
  .then((res) => {
    console.log(2);
  })
  .then((res) => {
    console.log(3);
  });
p.then((res) => {
  console.log(4);
});
p.then((res) => {
  console.log(5);
});
p.then((res) => {
  console.log(6);
});

//问输出顺序
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

// 问输出顺序
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2 start");
  return new Promise((resolve, reject) => {
    reject();
    console.log("async2 promise");
  });
}

console.log("illegalscript start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  });
console.log("illegalscript end");

// 问输出顺序
const p = new Promise((resolve, reject) => {
  console.log(0);
  reject();
  console.log(1);
  resolve();
  console.log(2);
});
p.then((res) => {
  console.log(3);
})
  .then((res) => {
    console.log(4);
  })
  .catch((res) => {
    console.log(5);
  })
  .then((res) => {
    console.log(6);
  })
  .catch((res) => {
    console.log(7);
  })
  .then((res) => {
    console.log(8);
  });
