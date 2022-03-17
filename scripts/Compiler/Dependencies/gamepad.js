//

/**
 * @addToUpdate - updateGameController();
 */

updaters.push(() => {
  updateGameController();
});

class GamePad {
  gamepad;
  id;
  controllerButtonMap = new Map();
  controllerJoysticks = new Map();
  totalButtons;
  totalJoysticks;
  mapping;
  setGamePad(gp) {
    this.gamepad = gp;
    this.totalButtons = gp.buttons.length;
    this.totalJoysticks = gp.axes.length / 2;
    this.mapping = gp.mapping;
    //console.log(this.totalJoysticks);
  }

  getButton(id) {
    try {
      return !this.controllerButtonMap.get(id)
        ? 0
        : this.controllerButtonMap.get(id);
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  getID() {
    return this.id;
  }

  vibrate(intesity, duration) {
    //Intensity 0 - 1
    //Duration in ms
    try {
      this.gamepad.vibrationActuator.playEffect(
        this.gamepad.vibrationActuator.type,
        {
          startDelay: 0,
          duration: duration,
          weakMagnitude: intesity,
          strongMagnitude: intesity,
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getJoystickPosition(id) {
    try {
      return {
        x: !this.controllerJoysticks.get(id * 2)
          ? 0
          : this.controllerJoysticks.get(id * 2),
        y: !this.controllerJoysticks.get(id * 2 + 1)
          ? 0
          : this.controllerJoysticks.get(id * 2 + 1),
      };
    } catch (error) {
      return {
        x: 0,
        y: 0,
      };
    }
  }
}

function supportsGamepads() {
  return !!navigator.getGamepads;
}

let driftGuard = 0.2;
function setDriftGuardBounds(d) {
  driftGuard = d;
}

let _gamepads = navigator.getGamepads();
let controllerButtonMap = new Map();
let controllerJoysticks = new Map();

let gamepads = [];
let totalGamepads;

function updateGameController() {
  _gamepads = navigator.getGamepads();

  /*for(let i = 0; i < _gamepads.length; i++){
      gamepads = [];
      gamepads.push(new GamePad());
    }*/
  totalGamepads = 0;
  for (let i = 0; i < _gamepads.length; i++) {
    if (_gamepads[i] != null) totalGamepads++;
  }

  if (totalGamepads != gamepads.length) {
    if (totalGamepads < gamepads.length) gamepads.pop();
    else gamepads.push(new GamePad());
  }

  // For each controller, show all the button and axis information
  for (let i = 0; i < totalGamepads; i++) {
    let gp = _gamepads[i];
    gamepads[i].setGamePad(gp);
    gamepads[i].id = gp.id;
    if (!gp || !gp.connected) {
      continue;
    }
    for (let j = 0; j < gp.buttons.length; j++) {
      gamepads[i].controllerButtonMap.set(j, gp.buttons[j].value);
    }

    let axesBoxCount = ((gp.axes.length + 1) / 2) | 0; // Round up (e.g. 3 axes is 2 boxes)
    for (let j = 0; j < axesBoxCount; j++) {
      let xAxis = gp.axes[j * 2];
      gamepads[i].controllerJoysticks.set(
        j * 2,
        Math.abs(xAxis) > driftGuard ? xAxis : 0
      );
      if (!(j == axesBoxCount - 1 && gp.axes.length % 2 == 1)) {
        let yAxis = gp.axes[j * 2 + 1];
        gamepads[i].controllerJoysticks.set(
          j * 2 + 1,
          Math.abs(yAxis) > driftGuard ? yAxis : 0
        );
      }
    }
  }
}
