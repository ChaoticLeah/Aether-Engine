//A simple Movement script by KevinWho
function onStart(parent) {}

function update(parent) {
  //Make sure that there is a controller connected and make sure it has at least 1 joystick
  if (
    !!gamepads[0] &&
    gamepads[0].totalJoysticks > 0 &&
    //Make sure the mapping is standard, if it's not weird stuff might happen.
    //This is not required but is recommended.
    //If you want to support non-standard controllers then you should make a thing
    //that lets the user map their controller manually
    gamepads[0].mapping == "standard"
  ) {
    //This gets the 1st joystick position on the first controller.
    let joycon = gamepads[0].getJoystickPosition(0); // The values can go from -1 to 1
    parent.x += joycon.x * 10;
    parent.y += joycon.y * 10;
  } else {
    //If there was no controller or it didn't have a joystick then use the WASD on a keyboard
    let velocity = { x: 0, y: 0 };
    if (keys["w"]) velocity.y = -1;
    if (keys["s"]) velocity.y = 1;
    if (keys["a"]) velocity.x = -1;
    if (keys["d"]) velocity.x = 1;
    parent.x += velocity.x * 10;
    parent.y += velocity.y * 10;
  }
}
