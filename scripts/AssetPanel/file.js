/**
 * DONT MAKE A NEW FILE THOUGH HERE
 */
export class File {
  fileName;
  dirId;
  type; //Type of file
  data;

  constructor(dirId, type, data) {
    this.dirId = dirId;
    this.type = type;
    this.data = data;
  }

  show(dir) {
    addFileElem(dir, () => {
      setDir(dir);
    });
  }
}
