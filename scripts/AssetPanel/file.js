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
    this.fileName = this.directory.split("/").pop();
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

      default:
        console.log(File.FILE_OPEN_EVENT_FUNC[getTypeReverse(this.type)]);
        addFileElem(
          dir,
          (data) => {
            //Open the file
            new EditorTab(
              dir,
              File.FILE_OPEN_EVENT_FUNC[getTypeReverse(this.type)].editorType,
              true,
              data
            );
          },
          getFontAwesomeElem(
            File.FILE_OPEN_EVENT_FUNC[getTypeReverse(this.type)].fontAwesome
          ),
          this.data //Pass the code into it so when its clicked we have access to it")
        );
        break;
    }
  }
}

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
  FONT: "font",
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
