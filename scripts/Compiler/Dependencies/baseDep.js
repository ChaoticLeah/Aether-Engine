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
      if (rawData.includes("base64")) {
        //Probably a font
      } else this.data = rawData;
    }
  }
}

function setAsset(path, data) {
  assets.set(path, data);

  //If its a font load it
  if (path.endsWith(".ttf")) {
    data.data = new FontFace(
      path.replace(/ /g, "-").replace(/\//g, "-").replace(/\./, "-"),
      `url(${data.rawData})`
    );

    data.data.load().then(() => {
      // add font to document
      document.fonts.add(data.data);
      // enable font with CSS class
      document.body.classList.add("fonts-loaded");
    });
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

let assets = new Map();
function getFile(path) {
  return assets.get(path);
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
  game.clear();

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
