import { calcSize } from "../../Canvas/canvasSizer.js";
import { getObject } from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import { fill, game, rect } from "../../toolbox.js";

export let gameVisualEditor = {
  init: () => {},
  loop: (tick) => {
    game.clear();

    let selectedObj = getObject(selectedObject);
    if (selectedObj === undefined) return;
    fill("red");
    rect(selectedObj.x, selectedObj.y, selectedObj.w, selectedObj.h);
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
    calcSize();
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
