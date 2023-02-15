const obj = {
    name: '1',
    fn() {
        return this.name
    },
    fn1: () => {
        console.log(this === globalThis)
    }
}

function f1() {
    return this;
}


// In Node:
console.log(f1() === globalThis); // true
console.log(this === globalThis)
console.log(obj.fn())
console.log(obj.fn1())


var globalObject = this;
var foo = (() => this);
console.log(foo() === this); // true
