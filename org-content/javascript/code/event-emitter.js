/**
 * 2. 简单实现一个事件订阅机制，具有监听on和触发emit方法
 * 示例：
 * const event = new EventEmitter();
 * event.on('someEvent', (...args) => {
 *     console.log('some_event triggered', ...args);
 * });
 * event.emit('someEvent', 'abc', '123');
 */
class EventEmitter {
  constructor() {
    this.handler = {};
  }
  /* 功能实现 */
  on(event, fn) {
    if (!this.handler[event]) {
      this.handler[event] = [];
    }
    this.handler[event].push(fn);
  }
  emit(event, ...args) {
    if (this.handler[event]) {
      this.handler[event].forEach((handler) => handler.call(null, ...args));
    }
  }
}

const event = new EventEmitter();
event.on("someEvent", (...args) => {
  console.log("some_event triggered", ...args);
});
event.emit("someEvent", "abc", "123");

module.exports = EventEmitter;
