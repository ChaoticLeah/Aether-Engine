import { editorData } from "../editorData.js";
import { getAssetsAsJSON, getDirectorysAsJSON } from "./assetDataJSONifyer.js";
import { getObjectsAsJSON } from "./objectDataJSONifyer.js";

let saveName = "";
export function saveProject(overideName) {
  //return;
  //If its already been saved, use that name
  if (overideName == undefined && saveName == "")
    saveName = prompt("What would you like to save this project as?");
  let name = saveName;

  if (overideName != undefined) {
    name = overideName;
  }

  //Get access to storage
  document
    .hasStorageAccess()
    .then((hasAccess) => {
      if (!hasAccess) {
        return document.requestStorageAccess();
      }
    })
    .then((_) => {
      let str = Flatted.stringify({
        saveVersion: editorData.version,
        assets: getAssetsAsJSON(),
        directorys: getDirectorysAsJSON(),
        objects: getObjectsAsJSON(),
      });

      localStorage.setItem(`AetherEngineSave-${name}`, str);
    });
}

export function loadProject() {}
