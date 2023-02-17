function print(n) {
    setTimeout(() => {
      // console.log(n);
    }, Math.floor(Math.random() * 1000));
  }
  for (var i = 0; i < 3; i++) {
    print(i);
  }

  const channel = new MessageChannel();
  const port1 = channel.port1;
  const port2 = channel.port2;
  port1.onmessage = function (m) {
    console.log("Got message", m);
  };
  port2.postMessage("send message");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", function () {
    Promise.resolve().then(function () {
      console.log("resolved-1");
    });
    console.log("click-1");
  });

  btn.addEventListener("click", function () {
    Promise.resolve().then(function () {
      console.log("resolved-2");
    });
    console.log("click-2");
  });

  // const evt = new MouseEvent("click");
  // btn.dispatchEvent(evt);
  //  btn.click()
  document.getElementById("btn2").addEventListener("click", function () {
    console.log("About to call click");
    btn.click();
    console.log("Done calling click");
  });