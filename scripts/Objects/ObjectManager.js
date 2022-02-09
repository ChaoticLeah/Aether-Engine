import { getCanvasSize } from "../Canvas/canvasSizer.js";
import { GameObject } from "./Object.js";

export let objects = new Map();

export function renderObjects() {}

//Finds a object by id
export function getObject(id) {
  return objects.get(id);
}

export function getObjects() {
  return objects;
}
export let rootObject;

function init() {
  rootObject = new GameObject({
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    name: "Object",
    enabled: true,
    parentObjectId: undefined,
    id: "root",
  });
  addObject(rootObject, "none");

  let camera = addEmptyObject("root");
  console.log(camera.components[0].properties);
  camera.setName("Camera");
  camera.setSize(178, 100);
}
init();

export function addObject(object, parentObjectId) {
  try {
    if (parentObjectId == undefined) {
      parentObjectId = "root";
    }
    object.getProperties().parentObjectId = parentObjectId.toString();
    if (parentObjectId != "none")
      getObject(parentObjectId).addChild(object.getProperties().id);
    objects.set(object.getProperties().id, object);
    return true;
  } catch (err) {
    return false;
  }
}

export function addEmptyObject(parentObject) {
  let obj = new GameObject({
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    name: "Object",
    enabled: true,
    parentObjectId: "root",
  });
  addObject(obj, parentObject);
  return obj;
}

export function addObjectMetadata(parentObject) {
  addObject(
    new GameObject({
      x: 0,
      y: 0,
      w: 10,
      h: 10,
      name: "Object",
      enabled: true,
      parentObjectId: "root",
    }),
    parentObject
  );
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

//reverse convertToScreenCoords
export function convertToGameCoords(x, y, w, h) {
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
    x: (x / (isWidthShorter ? shortestSide : missingSide)) * fullWidthNumber,
    y: (y / (isWidthShorter ? missingSide : shortestSide)) * fullWidthNumber,
    w: w / (shortestSide / fullWidthNumber),
    h: h / (shortestSide / fullWidthNumber),
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
export function clearObjects() {
  objects.clear();
  init();
}
