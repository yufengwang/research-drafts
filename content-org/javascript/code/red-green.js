//  使用Promise实现红绿灯交替重复亮
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
const active = (light, timeout) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      light();
      resolve();
    }, timeout)
  );
function redGreen() {
  active(red, 3000)
    .then(() => active(yellow, 2000))
    .then(() => active(green, 1000))
    .then(redGreen);
}

export default {};
