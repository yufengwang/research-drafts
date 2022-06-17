class Foo {
  constructor() {
    if (Foo.instance) {
      return Foo.instance;
    }
    Foo.instance = this;
  }
}

const foo = new Foo();

export default foo;
