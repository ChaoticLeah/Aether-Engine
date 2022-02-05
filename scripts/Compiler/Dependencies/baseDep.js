class File {
  /**
   *
   * @param {String} rawData
   */
  type;
  rawData;
  data;
  constructor(rawData) {
    this.rawData = rawData;
    if (rawData.includes("audio")) {
      this.data = new Audio(rawData);
    } else if (rawData.includes("image")) {
      this.data = new Image();
      this.data.src = rawData;
    } else {
      this.data = rawData;
    }
  }
}

function reCalculateSize(tabWidth, tabHeight) {
  let canvas = document.getElementById("canvas");
  canvas.width = tabWidth;
  canvas.height = tabHeight;
}

//DEPENDENCIES HERE

let objects = new Map();
//INITIALIZATION HERE

let frame = 0,
  fps,
  delta,
  lastRender;
function loop() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);

  console.log(objects);
  //console.log(mousePressed);
  for (let i = 0; i < objects.length; i++) {
    //objects[i].update();
  }

  resetMousePressed();
  //updateGameController();
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  frame++;
  //LOOP HERE
}

setLoopFunc(loop);

game.start();
