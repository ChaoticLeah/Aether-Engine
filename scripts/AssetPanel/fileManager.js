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
export function addFile(fileData, fileName, type, filePath = currentDir) {
  directories.get(filePath).addChildFile(filePath + "/" + fileName);
  files.set(filePath + "/" + fileName, new File(filePath, type, fileData));
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

export function addFileElem(dir, clickEvent, iconHtml) {
  let icon = document.createElement("div");
  let dirName =
    getDirectory(dir) != undefined ? getDirectory(dir).getName() : dir;

  if (iconHtml == undefined) {
    iconHtml = document.createElement("i");
    iconHtml.classList.add("far");

    iconHtml.classList.add("fa-folder");
  }

  let p = document.createElement("p");
  p.innerHTML = dirName;
  //<i class="far fa-folder"></i>
  icon.appendChild(iconHtml);
  icon.appendChild(p);

  // icon.innerHTML = `${code}<br><p>${dirName}</p>`;
  icon.addEventListener("click", clickEvent);
  document.getElementById("assetHolder").appendChild(icon);
}

export function getDirectory(path) {
  return directories.get(path);
}

export function getFile(path) {
  return files.get(path);
}
