import { GameObject } from "./object.js";

export let objects = new Map();

export function renderObjects() {}

//Finds a object by id
export function getObject(id) {
  return objects.get(id);
}
export let rootObject = new GameObject(0, 0, 10, 10);
rootObject.id = "root";
addObject(rootObject, "none");

export function addObject(object, parentObjectId) {
  if (parentObjectId == undefined) {
    parentObjectId = "root";
  }
  object.parentObjectId = parentObjectId.toString();
  if (parentObjectId != "none") getObject(parentObjectId).addChild(object.id);
  objects.set(object.id, object);
}

export function addEmptyObject(parentObject) {
  addObject(new GameObject(0, 0, 10, 10), parentObject);
}
