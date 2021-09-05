import { Directory } from "./directory.js";
import { File } from "./file.js";

let fileIdCounter = 0;
//let directoryIdCounter = 0;
let files = new Map();
//Key: Dir path. Value: dir Instance
let directories = new Map();

export let currentDir = "";

let currentDraggingFile = "";

addDirectory("");
addDirectory("/assets");
addDirectory("/scripts");

/**
 *
 * @param {String} fileData - The files Data
 * @param {String} fileName - The name of the file
 * @param {String} type - The type of file. Use File.TYPE to see the types
 * @param {String} filePath - Path to the file
 * @description - Used to add a file to the file system
 */
export function addFile(fileData, fileName, type, filePath = currentDir) {
  let path = filePath + "/" + fileName;
  directories.get(filePath).addChildFile(path);
  //Its ok to use new File() here, deprication was only added to make people use this instead of new File()
  files.set(path, new File(path, type, fileData));
}
/**
 *
 * @param {String} fullDir - full path to the new directory. Include the name of the new directory
 */
export function addDirectory(fullDir) {
  let splitDir = fullDir.split("/");
  splitDir.pop();
  let parentDir = splitDir.join("/");

  let dir = new Directory(parentDir, fullDir);
  if (fullDir != "") directories.get(parentDir).addChildDirectory(fullDir);
  directories.set(fullDir, dir);
}
/**
 * @description - Reload the currend directory to show any new files/folders
 */
export function reloadDirectory() {
  setDir(currentDir);
}

export function setDir(newDir = currentDir) {
  currentDir = newDir;
  document.getElementById("assetHolder").innerHTML = "";
  //Add the back directory button
  if (newDir != "")
    addFileElem("../", () => {
      setDir(getDirectory(currentDir).getParent());
    });
  //show all the folders and files
  directories.get(currentDir).showItems();
}

export function addFileElem(dir, clickEvent, iconHtml, extraData) {
  let icon = document.createElement("div");

  let dirName =
    getDirectory(dir) != undefined ? getDirectory(dir).getName() : dir;
  icon.classList.add(`file`);
  icon.classList.add("path:" + dirName);
  //If we didnt tell it how to look, set it to the default (folder icon)
  if (iconHtml == undefined) {
    iconHtml = document.createElement("i");
    iconHtml.classList.add("far");

    iconHtml.classList.add("fa-folder");
  }
  //Add the file name
  let p = document.createElement("p");
  p.innerHTML = dirName;
  icon.appendChild(iconHtml);
  icon.appendChild(p);

  //Add the click listener so that it opens whatever when the file is clicked
  icon.addEventListener("click", () => {
    clickEvent(extraData);
  });

  icon.addEventListener("dragstart", () => {
    currentDraggingFile = icon.getElementsByTagName("p")[0].innerHTML;
  });

  document.getElementById("assetHolder").appendChild(icon);
}
/**
 *
 * @param {String} path - the path to the directory
 * @returns - The directory object
 */
export function getDirectory(path) {
  return directories.get(path);
}

/**
 *
 * @param {String} path - the path to the file
 * @returns - The file object
 */
export function getFile(path) {
  return files.get(path);
}

/**
 *
 * @param {String} path - the path to the file
 * @peram {String} data - data
 * @returns - The file object
 */
export function setFileData(filepath, data) {
  return files.get(filepath).setData(data);
}

export function getCurrentDraggingFile() {
  return currentDraggingFile;
}
