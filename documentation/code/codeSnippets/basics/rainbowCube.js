let tick = 0;
let tickerSpeed = 5;

function onStart(parent) {
  //This will only run once
}

function update(parent) {
  //This will run every frame

  //Move the object this is attached to
  if (keyboard.keys[keyboard.KEY.A]) {
    parent.incrementX(-1);
  } else if (keyboard.keys[keyboard.KEY.D]) {
    parent.incrementX(1);
  }
  if (keyboard.keys[keyboard.KEY.W]) {
    parent.incrementY(-1);
  } else if (keyboard.keys[keyboard.KEY.S]) {
    parent.incrementY(1);
  }

  //Make the color change!  (Requires that you have a rectangle component on your Object)
  this.tick += this.tickerSpeed;
  parent.getFirstComponent(
    Component.RectangleComponent
  ).properties.color = `hsla(${this.tick},50%,50%,1)`;
}
