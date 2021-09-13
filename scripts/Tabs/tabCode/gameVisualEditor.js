import { setDir } from "../../AssetPanel/fileManager.js";
import { calcSize } from "../../Canvas/canvasSizer.js";
import {
  convertToScreenCoords,
  getObject,
  objects,
} from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import { fill, game, rect } from "../../toolbox.js";
const outlineWidth = 2;
export let gameVisualEditor = {
  init: () => {},
  loop: (tick) => {
    game.clear();

    fill(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      )
    );

    rect(
      convertToScreenCoords(0, 0).x,
      convertToScreenCoords(0, 0).y,
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
