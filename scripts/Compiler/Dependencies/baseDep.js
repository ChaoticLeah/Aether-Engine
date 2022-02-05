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

//DEPENDENCIES HERE

let objects = new Map();
//INITIALIZATION HERE

function loop() {
  //LOOP HERE
}

setLoopFunc(loop);

game.start();
