import { addFileElem, getDirectory, setDir } from "./fileManager.js";

export class Directory {
  ///parentDirectoryId; //the parent directory id
  fullPath; //the name of the directory
  name;
  childrenDirectorys = []; //List of strings

  childrenFiles = []; //List of strings of the files

  constructor(parentDir, fullPath) {
    this.parentDirectory = parentDir;
    this.fullPath = fullPath;

    let splitDir = this.fullPath.split("/");
    this.name = splitDir[splitDir.length - 1];
  }

  addChildDirectory(directoryId) {
    this.childrenDirectorys.push(directoryId);
    return this;
  }

  addFile(file) {}

  getFullPath() {
    /*let fullPath = "";
    let parentDir = getDirectory(parentDirectoryId);
    while (parentDir != undefined) {
      parentDir = getDirectory(parentDirectoryId);
    }*/

    return this.fullPath;
  }

  getParent() {
    let splitDir = this.fullPath.split("/");
    splitDir.pop();
    splitDir = splitDir.join("/");

    return splitDir;
  }

  getName() {
    return this.name;
  }

  show(dir) {
    addFileElem(dir, () => {
      setDir(dir);
    });
  }

  showItems() {
    for (let i = 0; i < this.childrenDirectorys.length; i++) {
      getDirectory(this.childrenDirectorys[i]).show(this.childrenDirectorys[i]);
    }
    for (let i = 0; i < this.childrenFiles.length; i++) {
      this.childrenFiles[i].show(this.childrenFiles[i]);
    }
  }
}
