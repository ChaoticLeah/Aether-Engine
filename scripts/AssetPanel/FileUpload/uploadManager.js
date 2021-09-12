import { File } from "../file.js";
import { addFile, reloadDirectory } from "../fileManager.js";
import { uploadFile } from "./uploadSaver.js";

export function initAssetManager() {
  let dropArea = document.getElementById("bottomPanel");
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      false
    );
  });

  document.getElementById("uploadButton").addEventListener("click", () => {
    uploadFile((files) => {
      uploadFiles(files);
    });
  });

  dropArea.addEventListener("drop", dropHandler, false);
}

function dropHandler(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  uploadFiles(files);
}

function uploadFiles(files) {
  for (let i = 0; i < files.length; i++) {
    let foundFunc = false;
    for (let j = 0; j < Object.keys(File.TYPE).length; j++) {
      let objKey = Object.keys(File.TYPE)[j];
      if (
        files[i].type.startsWith(File.TYPE[objKey]) ||
        (files[i].type == "" && files[i].name.endsWith(File.TYPE[objKey]))
      ) {
        foundFunc = true;
        File.UPLOAD_CONVERSION_FUNC[objKey](files[i], (dataURL) => {
          addFile(dataURL, files[i].name, File.TYPE[objKey]);
          reloadDirectory();
        });
      }
    }
    //If its of an unknown type then make it a generic file
    if (!foundFunc) {
      File.UPLOAD_CONVERSION_FUNC.FILE(files[i], (dataURL) => {
        addFile(dataURL, files[i].name, File.TYPE.FILE);
        reloadDirectory();
      });
    }
  }
}
