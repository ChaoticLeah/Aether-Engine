let tick = 0;

function onStart(parent) {
  //Printing this out shows an array of rectangle components.
  console.log(parent.getComponent("Rectangle Component"));
}

function update(parent) {
  //Let's cycle the first rectangle component's color from black to white on repeat.
  parent.getComponent("Rectangle Component")[0].data.color = `rgb(${this.tick % 255},${this.tick % 255},${this.tick % 255})`;

  //Add to the tick
  this.tick++;
}
