import { getObject, objects } from "./ObjectManager.js";
import { themeColors } from "../Themeing/themeColors.js";
import {
  deselectObject,
  selectObject,
} from "../ObjectEditorTab/ObjectEditorManager.js";

export let selectedObject = undefined;
let textSize = 18;
let clickcounter = 0;
let indentAmount = 30;
const textHeight = textSize + 4;

export function renderSidebarObjects() {
  //selectedObject = undefined;
  context.clearRect(0, 0, leftPanelW, leftPanelH);
  setFontSize(textSize, "Ubuntu");
  //renderChildrenObjectText("root");
  const objectDatas = getOrderedObjectArray()
  for (let i = 0; i < objectDatas.length; i++) {
    const objectData = objectDatas[i];
    
    const object = getObject(objectData.id)
    const depth = objectData.depth
    if (selectedObject == objectData.id) fill(themeColors["warning-highlight"]);
    else fill("white");
    
    text(
      object.getProperties().name,
      4 + depth * indentAmount,
      textHeight * (i + 1) + scrollY
    );
  }


  resize();
  requestAnimationFrame(renderSidebarObjects);
}


export function reloadObjectSelection() {
  selectObject(selectedObject);
}


function getObjectDataInSidebarScreenY(y){
  const calculated_y = ((y - scrollY) / (textHeight)) - 1
  // textHeight * (i + 1) + scrollY

  const objectDatas = getOrderedObjectArray()
  const clickedObjectData = objectDatas[Math.round(calculated_y)]
  return clickedObjectData
}

function selectObj(x, y) {
  selectedObject = undefined;

  const clickedObjectData = getObjectDataInSidebarScreenY(y)
  
  if(clickedObjectData != undefined){
    selectObject(clickedObjectData.id);
    selectedObject = clickedObjectData.id
  }
}

let leftPanelCanvas = document.getElementById("ObjectTreeCanvas");
export let leftPanelW, leftPanelH;
function resize() {
  leftPanelW = leftPanelCanvas.parentElement.offsetWidth;

  leftPanelH = leftPanelCanvas.offsetHeight;
  //If the size changed, resize the canvas

  if (context.canvas.width != leftPanelW) {
    context.canvas.width = leftPanelW;
    context.canvas.height = leftPanelH;
    panel.width = leftPanelW;
    panel.height = leftPanelH;
  }
}

let panel = document.getElementById("ObjectTreeCanvas");
let context = panel.getContext("2d");
let scrollY = 0;

function fill(col) {
  context.fillStyle = col;
}

function rect(x, y, w, h) {
  context.fillRect(x, y, w, h);
}

function text(text, x, y) {
  context.fillText(text, x, y);
}
function setFontSize(size, font) {
  context.font = size + "px " + font;
}

//Click

function walkEveryBranch(id, depth, callback) {
  const currentObject = getObject(id);
  if (!currentObject) {
    return;
  }

  // Execute the callback on the current node
  callback({ id, depth });

  // Recursively walk through each child object
  const childrenObjectIds = currentObject.getProperties().childrenObjectIds;
  for (let i = 0; i < childrenObjectIds.length; i++) {
    walkEveryBranch(childrenObjectIds[i], depth + 1, callback);
  }
}

/**
 * Retrieves an array of objects with ordered information about nodes to render.
 *
 * @returns {Array<{ id: (number|string), depth: number }>} An array of objects representing nodes, 
 *          each having an 'id' (number or string) and 'depth' (number).
 */
function getOrderedObjectArray() {
  let nodes = []

  // Walk every branch and print the childrenObjectIds
  walkEveryBranch("root", 0, (node) => {
    node.depth --
    if(node.id != "root")
      nodes.push(node)
  });

  return nodes
}

var dragging_object_id;

panel.onwheel = (e) => {
  scrollY += e.deltaY / 5
}

panel.onmousedown = (e) => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  const clickedObjectData = getObjectDataInSidebarScreenY(y)
  
  if(clickedObjectData != undefined){
    dragging_object_id = clickedObjectData.id
  }

  // dragData = { x, y, start: Date.now() };
};

panel.onmouseup = (e) => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  
  const clickedObjectData = getObjectDataInSidebarScreenY(y)
  let newParent
  if(clickedObjectData == undefined){
    //ROOT
    newParent = "root"
  }else{
    newParent = clickedObjectData.id
  }

  if(dragging_object_id != newParent){
    //console.log(getObject(dragging_object_id).getParentObjectId())
    getObject(getObject(dragging_object_id).getParentObjectId()).removeChild(dragging_object_id)
    getObject(dragging_object_id).setParentObjectId(newParent)
    getObject(newParent).addChild(dragging_object_id);


    
    //console.log(getObject(dragging_object_id).getParentObjectId())
  }
};

panel.onclick = function clickEvent(e) {
  // e = Mouse click event.
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  selectObj(x, y);
};

//Scroll

let mouseInArea = false;

panel.addEventListener("mouseover", () => {
  mouseInArea = true;
});

panel.addEventListener("mouseleave", () => {
  mouseInArea = false;
});

window.onload = function () {
  //adding the event listerner for Mozilla
  if (window.addEventListener)
    document.addEventListener("DOMMouseScroll", moveObject, false);

  //for IE/OPERA etc
  document.onmousewheel = moveObject;
};
function moveObject(event) {
  var delta = 0;

  if (!event) event = window.event;

  // normalize the delta
  if (event.wheelDelta) {
    // IE and Opera
    delta = event.wheelDelta / 60;
  } else if (event.detail) {
    // W3C
    delta = -event.detail / 2;
  }
  if (mouseInArea) {
    let scrollAmt = delta * 8;
    if (scrollY + scrollAmt > 0) {
      //return;
    }

    scrollY += scrollAmt;
  }
}
