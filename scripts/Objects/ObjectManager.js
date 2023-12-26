import { getCanvasSize } from "../Canvas/canvasSizer.js";
import { CameraComponent } from "./Components/cameraComponent.js";
import { Component } from "./Components/component.js";
import { GameObject } from "./Object.js";

export let objects = new Map();

export function renderObjects() {}

/**
 * 
 * @param {string | number} id 
 * @returns {GameObject}
 */
export function getObject(id) {
  return objects.get(id + "");
}

function getObjectByName(name) {
  for (let object of objects.values()) {
    if (object.components[0].properties.name == name) {
      return object;
    }
  }
  return undefined;
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
  camera.addComponent(new CameraComponent())
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


/**
 * Checks if a game object collides with any objects in the objects Map that have a RigidbodyComponent.
 * @param {GameObject} gameObject - The game object to check for collisions.
 * @returns {Array} An array of objects with which the gameObject collides (objects with RigidbodyComponent), or an empty array if there are no collisions.
 */
export function checkCollisionsWithRigidbody(gameObject) {
  const collisions = [];
  

  for (const [objectId, otherObject] of objects) {
    if(gameObject == otherObject) continue;
    // Check if the object has a RigidbodyComponent
    const rigidbodyComponent = otherObject.getComponent(Component.RigidbodyComponent);
    if (rigidbodyComponent.length > 0) {
      // Check for collision with the current object
      const collisionDirection = isObjectsColliding(gameObject, otherObject);

      // If there is a collision, add the object to the collisions array along with the collision direction
      if (collisionDirection.length > 0) {
        collisions.push({ object: otherObject, direction: collisionDirection });
      }
    }
  }

  return collisions;
}

export const DIR_ENUM = {
	LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
}


/**
 * Checks if two game objects are colliding and returns the direction of the collision.
 * @param {GameObject} object1 
 * @param {GameObject} object2 
 * @returns {string|boolean} The direction of the collision: "down", "left", "right", "up", or false if there is no collision.
 */
export function isObjectsColliding(object1, object2) {
  const x1 = object1.getGlobalOffsetX();
  const y1 = object1.getGlobalOffsetY();
  const w1 = object1.getW();
  const h1 = object1.getH();

  const x2 = object2.getGlobalOffsetX();
  const y2 = object2.getGlobalOffsetY();
  const w2 = object2.getW();
  const h2 = object2.getH();

  // Calculate the corners of each object
  const corners1 = {
    topLeft: { x: x1, y: y1 },
    topRight: { x: x1 + w1, y: y1 },
    bottomLeft: { x: x1, y: y1 + h1 },
    bottomRight: { x: x1 + w1, y: y1 + h1 },
  };

  const corners2 = {
    topLeft: { x: x2, y: y2 },
    topRight: { x: x2 + w2, y: y2 },
    bottomLeft: { x: x2, y: y2 + h2 },
    bottomRight: { x: x2 + w2, y: y2 + h2 },
  };
  let topLeft = isPointInside(corners1.topLeft, object2)
  let topRight = isPointInside(corners1.topRight, object2)
  let bottomRight = isPointInside(corners1.bottomRight, object2)
  let bottomLeft = isPointInside(corners1.bottomLeft, object2)

  // Check for overlap in each corner
  if (
    topLeft ||
    topRight||
    bottomRight ||
    bottomLeft
  ) {
    let sides = []
    if(topLeft || topRight){
       sides.push(DIR_ENUM.UP)
    }
    if(bottomRight || bottomLeft){
      sides.push(DIR_ENUM.DOWN)
    }
    if(bottomLeft || topLeft){
      sides.push(DIR_ENUM.LEFT)
    }
    if(bottomRight || topRight){
      sides.push(DIR_ENUM.RIGHT)
    }
    
    return sides
  }

  return [];
}

/**
 * Checks if a point is inside a given object.
 * @param {Object} point 
 * @param {GameObject} object 
 * @returns {boolean} True if the point is inside the object, false otherwise.
 */
function isPointInside(point, object) {
  const x = object.getGlobalOffsetX();
  const y = object.getGlobalOffsetY();
  const w = object.getW();
  const h = object.getH();

  return point.x >= x && point.x <= x + w && point.y >= y && point.y <= y + h;
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
