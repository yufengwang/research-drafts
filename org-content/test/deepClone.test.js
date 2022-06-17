const assert = require("assert");
const deepClone = require("../deep-clone");

describe("DeepClone", function () {
  const obj = {
    a: "string",
    b: 1,
    c: true,
    d: null,
    e: undefined,
    f: Symbol("id"),
    g: {
      h: "deep",
    },
  };
  const arr = ["string", 1, true, null, undefined, Symbol("id"), { h: "deep" }];
  const objCopy = deepClone(obj);

  describe("#deep clone object", function () {
    it("Cloned object should not reference original object", function () {
      assert.notEqual(obj, objCopy);
    });
    it("Deep object should be cloned", function () {
      obj.g.h = "changed";
      assert.notEqual(obj.g.h, objCopy.g.h);
      assert.notEqual(obj.g, objCopy.g);
    });
  });
});
