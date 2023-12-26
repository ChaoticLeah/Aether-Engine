import {
  addDirectory,
  addFile,
  reloadDirectory,
  removeAllDirectories,
} from "../AssetPanel/fileManager.js";
import { editorData } from "../editorData.js";
import { getComponentByName } from "../Objects/Components/componentAdder.js";
import { GameObject } from "../Objects/Object.js";
import {
  addObject,
  clearObjects,
  getObject,
} from "../Objects/ObjectManager.js";
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
  console.log(str);

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

  //clear all the objects
  clearObjects();

  //Load all the objects

  let objects = data.objects;
  let objectKeys = Object.keys(objects);

  for await (const objectKey of objectKeys) {
    console.log(objectKey)
    let object = objects[objectKey];
    let components = object.components;

    let newGameObject = new GameObject(components[0].properties);
    //start at object 1 so we skip the core component since it was already put into the game object.
    for (let i = 1; i < components.length; i++) {
      let component = components[i];
      let componentName = component.componentName;
      let componentProperties = component.properties;
      let newcomponent = getComponentByName(componentName);
      //if the component doesnt exist, skip it
      if (newcomponent == undefined) {
        addInfoPopup(
          "Error",
          `Could not find component ${componentName}`,
          popupTypes.ERROR
        );
        continue;
      }

      //set the newcomponents properties
      newcomponent.properties = componentProperties;
      //add the new component to the game object
      newGameObject.addComponent(newcomponent, componentProperties);
    }

    //add the object
    addObject(newGameObject, components[0].properties.parentObjectId);
  }
}
