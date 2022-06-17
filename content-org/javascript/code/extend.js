function Shape() {
  this.x = 0;
  this.y = 0;
}

function Rectangle(params) {
  Shape.call(this);
  this.z = params;
}

Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

Object.setPrototypeOf(Rectangle, Shape)

const instance = new Rectangle(100);
console.log(instance.constructor)

module.exports = {}