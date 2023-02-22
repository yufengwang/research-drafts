class MyPromise {
  constructor(executor) {
    this._states = {
      pending: 0,
      fulfilled: 1,
      rejected: 2,
    };
    this._state = this._states.pending;
    this._chains = [];
    this._value = null;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    if (typeof executor !== "function") {
      throw new Error("executor must be function!");
    }
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(val) {
    if (this._state !== this._states.pending) {
      return;
    }
    this._state = this._states.fulfilled;
    this._value = val;
    this._chains.forEach(({ onFulfilled }) => {
      onFulfilled(val);
    });
  }

  reject(val) {
    if (this._state !== this._states.pending) {
      return;
    }
    this._state = this._states.rejected;
    this._value = val;
    this._chains.forEach(({ onRejected }) => {
      onRejected(val);
    });
  }

  then(onFulfilled, onRejected) {
    const res = new MyPromise((resolve, reject) => {
      if (this._state === this._states.fulfilled) {
        resolve(onFulfilled(this._value));
      }
      if (this._state === this._states.rejected) {
        reject();
      }
      if (this._state === this._states.pending) {
        this._chains.push({
          onFulfilled,
          onRejected,
        });
      }
    });
    return res;
  }
}

new MyPromise((resolve, reject) => {
  resolve("resolved");
})
  .then((res) => res + "foo")
  .then((res) => console.log(res));
