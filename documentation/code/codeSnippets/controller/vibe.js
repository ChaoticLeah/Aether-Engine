function onStart(parent) {}

function update(parent) {
  //Make sure that the gamepad is connected and that the first button exists
  if (!!gamepads[0] && gamepads[0].totalButtons > -1) {
    let button = gamepads[0].getButton(0);
    if (button > 0) {
      //Vibrate at max strength for 100 ms
      gamepads[0].vibrate(1, 100);
    }
  }
}
