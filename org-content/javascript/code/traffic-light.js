class TrafficLight {
  constructor() {
    this.states = [
      new Light("green", "GO"),
      new Light("red", "STOP"),
      new Light("yellow", "STEADY"),
    ];
    this.current = this.states[0];
  }
  sign() {
    return this.current.sign();
  }
  change() {
    const totalStates = this.states.length;
    const currentIdx = this.states.findIndex((light) => light === this.current);
    if (currentIdx < totalStates - 1) {
      this.current = this.states[currentIdx + 1];
    } else {
      this.current = this.states[0];
    }
  }
}

class Light {
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }
  sign() {
    console.log(this.type);
    return this.type;
  }
}

const trafficLight = new TrafficLight();

trafficLight.sign();
trafficLight.change();
trafficLight.sign();
trafficLight.change();
trafficLight.sign();
trafficLight.change();
trafficLight.sign();
