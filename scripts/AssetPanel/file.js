import { EditorTab } from "../Tabs/editorTab.js";
import { setActiveTab, setActiveTabMetadata } from "../Tabs/TabManager.js";
import { getFontAwesomeElem } from "../toolbox.js";
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
  /**
   * @deprecated - DONT USE THIS. USE addFile() instead.
   * @description - DONT USE THIS. USE addFile() instead.

   */
  constructor(directory, type, data) {
    this.directory = directory;
    this.type = type;
    this.data = data;
  }

  show(dir) {
    switch (this.type) {
      case File.TYPE.IMAGE:
        let img = new Image();
        img.src = this.data;
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

      case File.TYPE.SCRIPT:
        addFileElem(
          dir,
          (data) => {
            //Open the file
            const code = data.code;
            new EditorTab(dir, "JsCodeEditor", true, {
              code: code,
            });
          },
          getFontAwesomeElem("far fa-file-code"),
          { code: this.data } //Pass the code into it so when its clicked we have access to it
        );
        break;

      case File.TYPE.AUDIO:
        addFileElem(
          dir,
          () => {
            //Open the file
          },
          getFontAwesomeElem("far fa-file-audio")
        );
        break;

      default:
        addFileElem(
          dir,
          () => {
            //Open the file
          },
          getFontAwesomeElem("far fa-file")
        );
        break;
    }
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
