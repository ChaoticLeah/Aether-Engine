import { initAssetManager } from "./scripts/AssetPanel/FileUpload/uploadManager.js";
import { initCanvasSizer } from "./scripts/Canvas/canvasSizer.js";
import { addEmptyObject } from "./scripts/Objects/ObjectManager.js";
import {
  renderSidebarObjects,
  selectedObject,
} from "./scripts/Objects/ObjectsTab.js";
import {
  addInfoPopup,
  addPopup,
  getPopup,
  getPopupByName,
} from "./scripts/Popups/popupManager.js";
import { initRightClickMenuManager } from "./scripts/RightClickMenu/RightClickMenuManager.js";
import { init as initTabManager } from "./scripts/Tabs/tabManager.js";
import { runTabs } from "./scripts/Tabs/tabRunner.js";
import { game, setLoopFunc } from "./scripts/toolbox.js";
game.start();

initTabManager();
setLoopFunc(runTabs);
renderSidebarObjects();
initRightClickMenuManager();
initCanvasSizer();
initAssetManager();

document.getElementById("AddObject").addEventListener("click", () => {
  addEmptyObject(selectedObject);
});
document.getElementById("more").addEventListener("click", () => {
  document.getElementById("dropdownMenu").classList.toggle("hidden");
});

let p = addInfoPopup(
  "First Popup!",
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a lacinia urna, sed dignissim metus. `
);
