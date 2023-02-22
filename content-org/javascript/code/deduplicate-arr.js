const arr = ["1", "1", "2", "3"];

function deDuplicate(arr) {
  return [...new Set(arr)];
}

const res = deDuplicate(arr);
console.log(res);

export default {}