function onStart(parent) {}

function update(parent) {
  //Check if the gamepad is connected, since we want to
  //check if the button at index 2 is pressed we need to check if index 2 exists.
  if (!!gamepads[0] && gamepads[0].totalButtons > 1) {
    //This gets the 1st joystick position on the first controller.
    let button = gamepads[0].getJoystickPosition(2);
    //This will return a value from 0 to 1. If it's pressed it will return a 1,
    //if it's not then It will return a 0. Some Buttons have pressure sensitivity
    // so you can get decimals.

    //The reason we are doing > 0 and not == 1 is because some have pressure and this
    // will account for any amount of press.
    if (button > 0) {
      console.log("Pressed! ", "Pushed (0 - 1): " + button);
    }
  }
}
