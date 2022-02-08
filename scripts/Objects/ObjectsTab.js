import { getObject, objects } from "./ObjectManager.js";
import { themeColors } from "../Themeing/themeColors.js";
import {
  onObjectDeSelect,
  onObjectSelect,
} from "../ObjectEditorTab/ObjectEditorManager.js";

export let selectedObject = undefined;
let lastFrameSelectedObject = undefined;
let textSize = 18;
let counter = 0;
let clickcounter = 0;

export function renderSidebarObjects() {
  //selectedObject = undefined;
  context.clearRect(0, 0, leftPanelW, leftPanelH);
  setFontSize(textSize, "Ubuntu");
  renderChildrenObjectText("root");

  resize();
  counter = 0;
  requestAnimationFrame(renderSidebarObjects);
}

let indentAmount = 30;

//Depth is how far nested in is it. This will be how offset to the right the text will be
function renderChildrenObjectText(parentObjId, depth = 0) {
  if (parentObjId == undefined) {
    parentObjId = "root";
  }
  let parent = getObject(parentObjId);
  for (let i = 0; i < parent.getProperties().childrenObjectIds.length; i++) {
    const objId = parent.getProperties().childrenObjectIds[i];
    const obj = getObject(objId);

    //Select the object
    if (
      (textSize + 4) * counter + scrollY < clickY &&
      (textSize + 4) * (counter + 1) + scrollY > clickY
    ) {
      //selectedObject = obj.id;
    }

    //Render the text
    if (selectedObject == objId) fill(themeColors["warning-highlight"]);
    else fill("white");
    text(
      obj.getProperties().name,
      4 - depth * indentAmount,
      (textSize + 4) * (counter + 1) + scrollY
    );

    counter++;
    //Render the child text
    if (obj.getProperties().childrenObjectIds.length > 0) {
      renderChildrenObjectText(objId, depth - 1);
    }
  }
}

//Depth is how far nested in is it. This will be how offset to the right the text will be
function detectClickedObjectEvent(parentObjId, depth = 0, y) {
  if (parentObjId == undefined) {
    parentObjId = "root";
  }
  let parent = getObject(parentObjId);

  for (let i = 0; i < parent.getProperties().childrenObjectIds.length; i++) {
    const objId = parent.getProperties().childrenObjectIds[i];
    const obj = getObject(objId);
    let done = false;

    //Select the object
    if (
      (textSize + 4) * clickcounter + scrollY < y &&
      (textSize + 4) * (clickcounter + 1) + scrollY > y
    ) {
      selectedObject = obj.getProperties().id;
      done = true;
      fill("red");
      rect(
        4 - depth * indentAmount,
        (textSize + 4) * clickcounter + scrollY,
        100,
        1
      );

      rect(
        4 - depth * indentAmount,
        (textSize + 4) * (clickcounter + 1) + scrollY,
        100,
        1
      );
    }

    clickcounter++;
    //Render the child text
    if (obj.getProperties().childrenObjectIds.length > 0 && !done) {
      detectClickedObjectEvent(objId, depth - 1, y);
    }
  }
  if (lastFrameSelectedObject != undefined)
    onObjectDeSelect(
      lastFrameSelectedObject,
      getObject(lastFrameSelectedObject)
    );
  if (selectedObject != undefined)
    onObjectSelect(selectedObject, getObject(selectedObject));

  lastFrameSelectedObject = selectedObject;
}

export function reloadObjectSelection() {
  let selobj = selectedObject;
  onObjectDeSelect(selectedObject, getObject(selectedObject));
  onObjectSelect(selobj, getObject(selobj));
}

let clickY = -1;

function selectObj(x, y) {
  // y -= 4;
  //y = Math.floor((y - scrollY) / (textSize + 4));
  clickY = y;
  selectedObject = undefined;
  detectClickedObjectEvent(undefined, 0, y);
  clickcounter = 0;

  /*for (let i = 0; i < objects.length; i++) {
    if (objects[i].id == y) selected = objects[y].id;
  }*/
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

    clickY += scrollAmt;
    scrollY += scrollAmt;
  }
}
