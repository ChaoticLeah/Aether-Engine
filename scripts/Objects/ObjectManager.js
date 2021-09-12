import { getCanvasSize } from "../Canvas/canvasSizer.js";
import { GameObject } from "./object.js";

export let objects = new Map();

export function renderObjects() {}

//Finds a object by id
export function getObject(id) {
  return objects.get(id);
}

export function getObjects() {
  return objects;
}

export let rootObject = new GameObject(0, 0, 10, 10);
rootObject.id = "root";
addObject(rootObject, "none");

export function addObject(object, parentObjectId) {
  try {
    if (parentObjectId == undefined) {
      parentObjectId = "root";
    }
    object.parentObjectId = parentObjectId.toString();
    if (parentObjectId != "none") getObject(parentObjectId).addChild(object.id);
    objects.set(object.id, object);
    return true;
  } catch (err) {
    return false;
  }
}

export function addEmptyObject(parentObject) {
  addObject(new GameObject(0, 0, 10, 10), parentObject);
}

export function addObjectMetadata(parentObject) {
  addObject(new GameObject(0, 0, 10, 10), parentObject);
}

export function convertToScreenCoords(x, y) {
  let fullWidthNumber = 100;

  let canvasSize = getCanvasSize();

  //Get the shortest side
  let scaler = canvasSize.w;
  if (scaler > canvasSize.h) {
    scaler = canvasSize.h;
  }

  return {
    x: x * (scaler / fullWidthNumber),
    y: y * (scaler / fullWidthNumber),
  };
}
