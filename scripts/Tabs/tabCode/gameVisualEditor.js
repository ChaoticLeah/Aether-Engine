import { setDir } from "../../AssetPanel/fileManager.js";
import { calcSize } from "../../Canvas/canvasSizer.js";
import {
  globalOffsetX,
  globalOffsetY,
  setGlobalOffsetX,
  setGlobalOffsetY,
} from "../../Objects/Object.js";
import {
  convertToGameCoords,
  convertToScreenCoords,
  getObject,
  objects,
} from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import {
  DragRect,
  fill,
  game,
  inArea,
  mouseButton,
  mouseDown,
  mousePressed,
  mouseX,
  mouseY,
  pressedMouseStartX,
  pressedMouseStartY,
  rect,
  removeCanvasOffset,
  setCursor,
} from "../../toolbox.js";
const outlineWidth = 2;

//for helping you drag around the objects in the editor
let dragoffsetXSave = 0;
let dragoffsetYSave = 0;

let objectDragOffsetX = 0;
let objectDragOffsetY = 0;

let cornerTopLeftDragHandle = new DragRect(
  0,
  0,
  10,
  10,
  "red",
  (x, y, parent) => {
    //set the selected objects x
    console.log(x);
    getObject(selectedObject).setX(x / 10);
    //set the selected objects y
    //getObject(selectedObject).setY(y);

    //parent.x = 0;
    //parent.y = 0;
  }
);

export let gameVisualEditor = {
  init: () => {},
  loop: (tick) => {
    game.clear();

    //detect mouse drag
    if (mouseDown) {
      if (mouseButton == "MIDDLE") {
        if (mousePressed) {
          dragoffsetXSave = globalOffsetX;
          dragoffsetYSave = globalOffsetY;
          setCursor("grabbing");
        }

        //console.log(mouseX - pressedMouseStartX, mouseY - pressedMouseStartY);
        setGlobalOffsetX(dragoffsetXSave + (mouseX - pressedMouseStartX));
        setGlobalOffsetY(dragoffsetYSave + (mouseY - pressedMouseStartY));
      }
    }

    fill(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      )
    );

    rect(
      convertToScreenCoords(0, 0).x + globalOffsetX,
      convertToScreenCoords(0, 0).y + globalOffsetY,
      convertToScreenCoords(100, 0).x,
      convertToScreenCoords(0, 100).y
    );

    let selectedObj = getObject(selectedObject);
    //Selection outline
    if (selectedObj != undefined) {
      fill("red");

      /*rect(
        parseInt(selectedObj.getX()) - outlineWidth,
        parseInt(selectedObj.getY()) - outlineWidth,
        parseInt(selectedObj.getW()) + outlineWidth * 2,
        parseInt(selectedObj.getH()) + outlineWidth * 2
      );*/

      rect(
        parseInt(selectedObj.getX()),
        parseInt(selectedObj.getY()),
        parseInt(selectedObj.getW()),
        parseInt(selectedObj.getH())
      );

      //for grabbing and dragging the object

      let relativeCoords = removeCanvasOffset(mouseX, mouseY);

      if (
        mouseDown &&
        mouseButton == "LEFT" &&
        inArea(
          relativeCoords.x,
          relativeCoords.y,
          selectedObj.getX(),
          selectedObj.getY(),
          selectedObj.getW(),
          selectedObj.getH()
        )
      ) {
        if (mousePressed) {
          objectDragOffsetX = selectedObj.getXWithoutEditorOffsetScreenCoords();
          objectDragOffsetY = selectedObj.getYWithoutEditorOffsetScreenCoords();
        }
        //Need to convert pixel coords to relative coords(0-100)

        setCursor("grab");
        let relativeCoords = removeCanvasOffset(
          mouseX - globalOffsetX,
          mouseY - globalOffsetY
        );

        let coords = convertToGameCoords(relativeCoords.x, relativeCoords.y);

        getObject(selectedObject).setX(coords.x);
        getObject(selectedObject).setY(coords.y);
      }
    }
    objects.forEach((object) => {
      if (object.getParentObjectId() == "root") object.render();
    });
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
    setTimeout(() => {
      setDir("");
      calcSize();
    }, 1);
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
