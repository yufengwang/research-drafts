let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
  name: "姓名",
  age: 18,
};
const result = render(template, data); // 我是姓名，年龄18，性别undefined
console.log(result);

/**
 * @param {string} template
 */
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  let result;
  while ((result = reg.exec(template))) {
    // 注意，此处template被修改了，reg不能有g flag。不然reg的lastIndex跟template会对不上
    template = template.replace(result[0], data[result[1]]);
  }
  return template;
}
