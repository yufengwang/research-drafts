// es5 继承
// 父类
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.foo = 'foo'
// 子类
function Rectangle(params) {
  Shape.call(this);
  this.z = params;
}

Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

// 继承 static
Object.setPrototypeOf(Rectangle, Shape)
console.log(Rectangle.foo)


const instance = new Rectangle(100);

export default {}