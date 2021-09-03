import { Directory } from "./directory.js";
import { File } from "./file.js";

let fileIdCounter = 0;
//let directoryIdCounter = 0;
let files = new Map();
//Key: Dir path. Value: dir Instance
let directories = new Map();

export let currentDir = "";

addDirectory("");
addDirectory("/assets");
addDirectory("/scripts");

//use this, dont use new File()
export function addFile(filePath, fileData) {
  files.set(fileIdCounter++, new File(filePath, fileData));
}

export function addDirectory(fullDir) {
  //if (parentDir == undefined) parentDir = "root";
  let splitDir = fullDir.split("/");
  splitDir.pop();
  let parentDir = splitDir.join("/");

  let dir = new Directory(parentDir, fullDir);
  if (fullDir != "") directories.get(parentDir).addChildDirectory(fullDir);
  directories.set(fullDir, dir);
}

export function setDir(newDir) {
  currentDir = newDir;
  document.getElementById("assetHolder").innerHTML = "";
  addFileElem("../", () => {
    setDir(getDirectory(currentDir).getParent());
  });
  directories.get(currentDir).showItems();
}

export function addFileElem(dir, clickEvent) {
  let icon = document.createElement("div");
  let dirName =
    getDirectory(dir) != undefined ? getDirectory(dir).getName() : dir;
  icon.innerHTML = `<i class="far fa-folder"></i><br><p>${dirName}</p>`;
  icon.addEventListener("click", clickEvent);
  document.getElementById("assetHolder").appendChild(icon);
}

export function getDirectory(path) {
  return directories.get(path);
}
