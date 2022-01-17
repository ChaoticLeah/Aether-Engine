import { setDir } from "../../AssetPanel/fileManager.js";
import { calcSize } from "../../Canvas/canvasSizer.js";
import {
  globalOffsetX,
  globalOffsetY,
  setGlobalOffsetX,
  setGlobalOffsetY,
} from "../../Objects/Object.js";
import {
  convertToScreenCoords,
  getObject,
  objects,
} from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import {
  fill,
  game,
  mouseButton,
  mouseDown,
  mousePressed,
  mouseX,
  mouseY,
  pressedMouseStartX,
  pressedMouseStartY,
  rect,
  setCursor,
} from "../../toolbox.js";
const outlineWidth = 2;

//for helping you drag around the objects in the editor
let dragoffsetXSave = 0;
let dragoffsetYSave = 0;

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
    }
    objects.forEach((object) => {
      object.render();
    });
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
    setDir("");
    calcSize();
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
