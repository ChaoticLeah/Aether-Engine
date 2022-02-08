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
  let canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = tabWidth;
  canvas.height = tabHeight;
}

function getCanvasSize() {
  let canvas = document.getElementsByTagName("canvas")[0];

  let w = canvas != null ? canvas.offsetWidth : 0;
  let h = canvas != null ? canvas.offsetHeight : 0;

  return { w: w, h: h };
}

//DEPENDENCIES HERE

//let objects = new Map();

// function getObject(id) {
//   return objects.get(id);
// }
//INITIALIZATION HERE

let frame = 0,
  fps,
  delta,
  lastRender;
function loop() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);

  //get the root game object
  let root = objects.get("root");
  root.render();

  game.resetMousePressed();
  //updateGameController();
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  frame++;

  //LOOP HERE
}

game.setLoopFunc(loop);

//game.start();
