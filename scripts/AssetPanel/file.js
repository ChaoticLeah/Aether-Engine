import { EditorTab } from "../Tabs/editorTab.js";
import { getFontAwesomeElem } from "../toolbox.js";
import { addFileElem, getFile } from "./fileManager.js";
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
  rawData;
  data;

  /**
   * @deprecated - DONT USE THIS. USE addFile() instead.
   * @description - DONT USE THIS. USE addFile() instead.

   */
  constructor(directory, type, data) {
    this.directory = directory;
    this.type = type;
    this.rawData = data;

    switch (type) {
      case File.TYPE.IMAGE:
        this.data = new Image();
        this.data.src = this.rawData;
        break;
      case File.TYPE.FONT:
        this.data = new FontFace(
          directory.replace(/ /g, "-").replace(/\//g, "-").replace(/\./, "-"),
          `url(${this.rawData})`
        );
        this.data.load().then(() => {
          // add font to document
          document.fonts.add(this.data);
          // enable font with CSS class
          document.body.classList.add("fonts-loaded");
        });
        break;
    }
  }

  show(dir) {
    this.fileName = this.directory.split("/");
    this.fileName = this.fileName[this.fileName.length - 1];
    switch (this.type) {
      case File.TYPE.IMAGE:
        let img = new Image();
        img.src = this.rawData;
        addFileElem(
          dir,
          () => {
            //Open the file
            new EditorTab(dir, "imageViewTab", true);
            imageViewTabImg.src = img.src;
          },
          img
        );
        break;

      default:
        addFileElem(
          dir,
          (data) => {
            //Open the file
            // new EditorTab(
            //   dir,
            //   File.FILE_OPEN_EVENT_FUNC[getTypeReverse(this.type)].editorType,
            //   true,
            //   { dir: dir, data: data }
            // );
            openFile(dir);
          },
          getFontAwesomeElem(
            File.FILE_OPEN_EVENT_FUNC[getTypeReverse(this.type)].fontAwesome
          ),
          this.rawData //Pass the code into it so when its clicked we have access to it")
        );
        break;
    }
  }

  setData(data) {
    this.rawData = data;
  }
}
/**
 * @description - Takes in the value of the json and returns the key
 * @param {String} type - one of the values from File.TYPE
 */
function getTypeReverse(type) {
  for (let i = 0; i < Object.keys(File.TYPE).length; i++) {
    let key = Object.keys(File.TYPE)[i];
    if (File.TYPE[key] === type) {
      return key;
    }
  }
}

File.TYPE = {
  SCRIPT: "text/javascript",
  IMAGE: "image",
  FONT: "ttf",
  AUDIO: "audio",
  JSON: "text/json",
  FILE: "file",
};

File.UPLOAD_CONVERSION_FUNC = {
  SCRIPT: readFile,
  IMAGE: readImage,
  FONT: readFileBase64,
  AUDIO: readImage,
  JSON: readFile,
  FILE: readFile,
};

File.FILE_OPEN_EVENT_FUNC = {
  SCRIPT: {
    fontAwesome: "far fa-file-code",
    editorType: "JsCodeEditor",
  },
  IMAGE: undefined,
  FONT: {
    fontAwesome: "fas fa-font",
    editorType: "JsCodeEditor",
  },
  AUDIO: {
    fontAwesome: "far fa-file-audio",
    editorType: "JsCodeEditor",
  },
  FILE: {
    fontAwesome: "far fa-file",
    editorType: "JsCodeEditor",
  },
};

export function openFile(dir) {
  let file = getFile(dir);
  //Open the file
  new EditorTab(
    dir,
    File.FILE_OPEN_EVENT_FUNC[getTypeReverse(file.type)].editorType,
    true,
    { dir: dir, data: file.rawData }
  );
}
