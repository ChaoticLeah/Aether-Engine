import { getFiles, getFile, getDirectorys } from "../AssetPanel/fileManager.js";

export function getAssetsAsJSON(containFile = false) {
  /*
    {
        "assetName": {type: "file", data:"..."}
    }
    */
  let returningJSON = {};

  let fileKeys = [...getFiles().keys()];

  fileKeys.forEach((fileKey) => {
    let file = getFile(fileKey);

    returningJSON[fileKey] = {
      type: file.type,
      rawData: file.rawData,
      file: containFile ? file : undefined,
    };
  });

  return returningJSON;
}

export function getDirectorysAsJSON() {
  let returningJSON = [];
  let dirKeys = [...getDirectorys().keys()];
  returningJSON = dirKeys;
  return returningJSON;
}
//getDirectorys
