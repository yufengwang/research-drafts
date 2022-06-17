class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unSubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(change) {
    this.observers.forEach((ele) => ele.update(change));
  }
}

class Observer {
  update(change) {
    console.log(change);
  }
}

const subject = new Subject();
subject.subscribe(new Observer());
