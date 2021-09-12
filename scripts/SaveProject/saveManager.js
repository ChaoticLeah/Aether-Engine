import {
  addDirectory,
  addFile,
  reloadDirectory,
  removeAllDirectories,
} from "../AssetPanel/fileManager.js";
import { editorData } from "../editorData.js";
import { getComponentByName } from "../Objects/Components/componentAdder.js";
import { GameObject } from "../Objects/object.js";
import { addObject } from "../Objects/ObjectManager.js";
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

export async function loadProject() {
  let name = prompt("What project would you like to load?");
  //Get the data
  let data = Flatted.parse(localStorage.getItem(`AetherEngineSave-${name}`));

  //Load all the directories
  removeAllDirectories();
  let directorys = data.directorys;
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

    addObject(gameObject, object.parentObjectId);

    console.log(objectKey, object);
  }
}
