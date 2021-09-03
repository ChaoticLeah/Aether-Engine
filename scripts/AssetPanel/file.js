import { addFileElem, setDir } from "./fileManager.js";
import {
  readFile,
  readFileBase64,
  readImage,
} from "./FileUpload/uploadSaver.js";

/**
 * DONT MAKE A NEW FILE THOUGH HERE
 */
export class File {
  fileName;
  directory;
  type; //Type of file
  data;

  constructor(directory, type, data) {
    this.directory = directory;
    this.type = type;
    this.data = data;
  }

  show(dir) {
    if (this.type == File.TYPE.IMAGE) {
      let img = new Image();
      img.src = this.data;
      addFileElem(
        dir,
        () => {
          //Open the file
        },
        img
        //`<img src="${this.data}>"`
      );
    } else
      addFileElem(dir, () => {
        //Open the file
      });
  }
}

File.TYPE = {
  SCRIPT: "text/javascript",
  IMAGE: "image",
  FONT: "font",
  AUDIO: "audio",
  FILE: "file",
};

File.UPLOAD_CONVERSION_FUNC = {
  SCRIPT: readFile,
  IMAGE: readImage,
  FONT: readFileBase64,
  AUDIO: readImage,
  FILE: readFile,
};
