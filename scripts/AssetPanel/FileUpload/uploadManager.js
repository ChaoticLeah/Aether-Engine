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
    if (!foundFunc) {
      File.UPLOAD_CONVERSION_FUNC.FILE(files[i], (dataURL) => {
        addFile(dataURL, files[i].name, File.TYPE.FILE);
        reloadDirectory();
      });
    }
    continue;
    if (
      /*imageTypes.includes(files[i].type)*/ files[i].type.startsWith("image/")
    )
      readImage(files[i], (dataURL) => {
        assets.set(files[i].name, new ImageObject(dataURL));
      });
    else if (files[i].type.startsWith("audio/")) {
      readImage(files[i], (dataURL) => {
        assets.set(files[i].name, new AudioObject(dataURL));
      });
    } else if (files[i].type == "text/javascript") {
      readFile(files[i], (data) => {
        assets.set(files[i].name, new ScriptObject(data));
      });
    } else if (files[i].name.endsWith(".ttf")) {
      readFileBase64(files[i], (data) => {
        assets.set(files[i].name, new FontObject(data, files[i].name));
      });
    } else {
      readFile(files[i], (data) => {
        assets.set(files[i].name, new FileObject(data));
      });
    }
  }
}
