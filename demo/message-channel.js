const start = performance.now();
function draw() {
  if (performance.now() - start > 5000) {
    return;
  }
  document.body.appendChild(document.createTextNode("hi \n\r"));
}

setInterval(draw, 10);
const channel = new MessageChannel();
render();
function render() {
  channel.port1.onmessage = onMessageReceived;
  channel.port2.postMessage(null);
}
function onMessageReceived(event) {
  performUnitOfWork();
  channel.port2.postMessage(null);
}
function performUnitOfWork() {
  if (performance.now() - start > 5000) {
    return;
  }
  sleep(5);
  console.log("do work");
}
function sleep(milliseconds) {
  const start = performance.now();
  while (performance.now() - start < milliseconds) {}
  // sleep for given {milliseconds} period (synchronous)
}
