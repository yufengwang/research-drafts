function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.foo = 'foo'

function Rectangle(params) {
  Shape.call(this);
  this.z = params;
}

Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

Object.setPrototypeOf(Rectangle, Shape)
console.log(Rectangle.foo)


const instance = new Rectangle(100);

module.exports = {}