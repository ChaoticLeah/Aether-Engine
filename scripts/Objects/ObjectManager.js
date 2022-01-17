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

let camera = addEmptyObject("root");
console.log(camera.components[0].properties);
camera.setName("Camera");
camera.setSize(178, 100);

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
  let obj = new GameObject(0, 0, 10, 10);
  addObject(obj, parentObject);
  return obj;
}

export function addObjectMetadata(parentObject) {
  addObject(new GameObject(0, 0, 10, 10), parentObject);
}

export function convertToScreenCoords(x, y, w, h) {
  let fullWidthNumber = 100;

  let canvasSize = getCanvasSize();

  //Get the shortest side
  let isWidthShorter = true;
  let shortestSide = canvasSize.w;
  //Number is from aspect ratio calculation of height / width of a 16:9 aspect ratio
  if (shortestSide * 0.5625 > canvasSize.h) {
    isWidthShorter = false;
    shortestSide = canvasSize.h;
  }

  let missingSide = isWidthShorter
    ? getHeight(shortestSide)
    : getWidth(shortestSide);

  return {
    //x: x * (isWidthShorter ? getHeight(scaler) : getWidth(scaler)),
    //y: y * (isWidthShorter ? getHeight(scaler) : getWidth(scaler)),

    x: (x / fullWidthNumber) * (isWidthShorter ? shortestSide : missingSide), //x * (shortestSide / fullWidthNumber) * missingSide,
    y: (y / fullWidthNumber) * (isWidthShorter ? missingSide : shortestSide), //y * (shortestSide / fullWidthNumber) * missingSide,
    w: w * (shortestSide / fullWidthNumber),
    h: h * (shortestSide / fullWidthNumber),
  };
}

function getWidth(height) {
  //16:9
  return (height / 9) * 16;
}
function getHeight(width) {
  //16:9
  return (width / 16) * 9;
}
