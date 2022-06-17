"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(
  require("@babel/runtime/regenerator")
);

var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator")
);

function f2() {
  return _f.apply(this, arguments);
}

function _f() {
  _f = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/ _regenerator["default"].mark(function _callee() {
      var y;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return 20;

            case 2:
              y = _context.sent;
              console.log(y); // 20

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _f.apply(this, arguments);
}

f2();
