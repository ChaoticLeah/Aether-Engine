import { calcSize } from "../../Canvas/canvasSizer.js";
import { getObject, objects } from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import { fill, game, rect } from "../../toolbox.js";
const outlineWidth = 2;
export let gameVisualEditor = {
  init: () => {},
  loop: (tick) => {
    game.clear();

    let selectedObj = getObject(selectedObject);
    //Selection outline
    if (selectedObj != undefined) {
      fill("red");

      rect(
        parseInt(selectedObj.getX()) - outlineWidth,
        parseInt(selectedObj.getY()) - outlineWidth,
        parseInt(selectedObj.getW()) + outlineWidth * 2,
        parseInt(selectedObj.getH()) + outlineWidth * 2
      );
    }
    objects.forEach((object) => {
      object.render();
    });
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";

    calcSize();
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
