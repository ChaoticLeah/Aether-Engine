function onStart(parent) {}

function update(parent) {
  if (!!gamepads[0] && gamepads[0].totalJoysticks > 0) {
    //This gets the 1st joystick position on the first controller.
    let joycon = gamepads[0].getJoystickPosition(0);
    // The values can go from -1 to 1 for both the x and the y
    parent.x += joycon.x * 10;
    parent.y += joycon.y * 10;
  }
}
