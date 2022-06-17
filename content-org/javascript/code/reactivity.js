function getTrackableObject(obj) {
  if (obj[Symbol.for("isTracked")]) return obj;
  const tracked = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    Object.defineProperty(tracked, key, {
      configurable: true,
      enumerable: true,
      get() {
        return obj[key];
      },
      set(value) {
        if (typeof value === "object") {
          value = getTrackableObject(value);
        }
        obj[key] = value;
        console.log(`'${key}' has changed.`);
      },
    });
  }
  // marked as 'tracked'
  Object.defineProperty(tracked, Symbol.for("isTracked"), {
    configurable: false,
    enumerable: false,
    value: true,
  });
  return tracked;
}

// track app state
const appState = getTrackableObject({ foo: 1 });

appState.foo = 3; // log `'foo' has changed.`

const TrackableArrayProto = Object.create(Array.prototype);
for (const method of [
  "push",
  "pop",
  "splice",
  "unshift",
  "shift",
  "sort",
  "reverse",
]) {
  const original = Array.prototype[method];
  TrackableArrayProto[method] = function () {
    const result = original.apply(this, arguments);
    console.log(`'${method}' was called`);
    if (method === "push" || method === "unshift" || method === "splice") {
      // TODO track newly added item too!
    }
    return result;
  };
}
function getTrackableArray(arr) {
  const trackedArray = getTrackableObject(arr);
  // set the prototype to the patched prototype
  trackedArray.__proto__ = TrackableArrayProto;
  return trackedArray;
}

// track app state
const appState = getTrackableArray([1, 2, 3]);
appState.push(4); // log `'push' was called.`
appState[0] = "foo"; // log `'0' has changed.
