import {
  addDirectory,
  addFile,
  reloadDirectory,
  removeAllDirectories,
} from "../AssetPanel/fileManager.js";
import { editorData } from "../editorData.js";
import { getComponentByName } from "../Objects/Components/componentAdder.js";
import { GameObject } from "../Objects/Object.js";
import { addObject, getObject } from "../Objects/ObjectManager.js";
import { addInfoPopup, popupTypes } from "../Popups/popupManager.js";
import { getAssetsAsJSON, getDirectorysAsJSON } from "./assetDataJSONifyer.js";
import { getObjectsAsJSON } from "./objectDataJSONifyer.js";
import { download } from "../toolbox.js";
import { createUI } from "./loadProjectUI.js";

let saveName = "";
export function saveProject(overideName, downloadFile = false) {
  //return;
  //If its already been saved, use that name
  if (overideName == undefined && saveName == "")
    saveName = prompt("What would you like to save this project as?");
  let name = saveName;

  if (overideName != undefined) {
    name = overideName;
  }

  let str = Flatted.stringify({
    saveVersion: editorData.version,
    assets: getAssetsAsJSON(),
    directorys: getDirectorysAsJSON(),
    objects: getObjectsAsJSON(),
  });

  if (downloadFile) {
    download(str, `${name}.aether`, "AEFile");
  }
  //Get access to storage
  else
    document
      .hasStorageAccess()
      .then((hasAccess) => {
        if (!hasAccess) {
          return document.requestStorageAccess();
        }
      })
      .then((_) => {
        try {
          localStorage.setItem(`AetherEngineSave-${name}`, str);
        } catch (err) {
          if (err.toString().includes("exceeded the quota.")) {
            addInfoPopup(
              "Error",
              `Project size is too big to save in local storage, you can still download it from the menu to save it.`,
              popupTypes.ERROR
            );
          } else
            addInfoPopup(
              "Error",
              `Error When saving:\n ${err}`,
              popupTypes.ERROR
            );
        }
      });
}

export async function loadProject(data = undefined) {
  if (data == undefined) {
    createUI();
    return;

    //let name = prompt("What project would you like to load?");
    //Get the data
    //data = Flatted.parse(localStorage.getItem(`AetherEngineSave-${name}`));
  }
  //Load all the directories
  removeAllDirectories();
  let directorys = data.directorys.sort(function (a, b) {
    return (a.match(/\//g) || []).length - (b.match(/\//g) || []).length;
  });
  console.log(directorys);
  for await (const directory of directorys) {
    addDirectory(directory);
  }
  reloadDirectory();

  //Load all the assets
  let assets = data.assets;
  let assetKeys = Object.keys(assets);
  for await (const assetKey of assetKeys) {
    let asset = assets[assetKey];
    let assetDir = assetKey.split("/");
    let assetName = assetDir.pop();
    assetDir = assetDir.join("/");

    addFile(asset.rawData, assetName, asset.type, assetDir);
  }
  reloadDirectory();

  //Load all the objects

  let objects = data.objects;
  let objectKeys = Object.keys(objects).reverse();
  let objectsToAdd = [];

  for await (const objectKey of objectKeys) {
    const object = objects[objectKey];

    let gameObject = new GameObject(0, 0, 10, 10);
    gameObject.id = objectKey;

    //Add all the components

    for await (const component of object.components) {
      let componentName = component.componentName;
      //For the core components we add them differently
      if (componentName == "Core Component") {
        Object.assign(gameObject.components[0], component);
        gameObject.components[0].parentObject = gameObject;
        gameObject.components[0].initValues();
        continue;
      }
      //Otherwise just make new components
      let componentObj = getComponentByName(componentName);
      //Set all the components values
      Object.assign(componentObj, component);
      componentObj.parentObject = gameObject;
      componentObj.initValues();
      //add the component to the object
      gameObject.addComponent(componentObj);
    }
    if (object.parentObjectId == "none") {
      addObject(gameObject, object.parentObjectId);
    } else
      objectsToAdd.push({ obj: gameObject, parent: object.parentObjectId });
  }
  objectsToAdd = objectsToAdd.reverse();
  let ticker = 0;
  while (objectsToAdd.length > 0) {
    if (
      addObject(
        objectsToAdd[ticker % objectsToAdd.length].obj,
        objectsToAdd[ticker % objectsToAdd.length].parent
      )
    ) {
      //console.log(objectsToAdd[ticker % objectsToAdd.length].parent);
      objectsToAdd.splice(ticker % objectsToAdd.length, 1);
    } else {
    }
    //console.log(getObject("root"));

    ticker++;
  }

  //    addObject(gameObject, object.parentObjectId);
}
