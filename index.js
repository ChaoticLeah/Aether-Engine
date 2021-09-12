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
import { setupSaveButtonHandlers } from "./scripts/SaveProject/saveProjectButtonManager.js";
import { init as initTabManager } from "./scripts/Tabs/tabManager.js";
import { runTabs } from "./scripts/Tabs/tabRunner.js";
import { game, setLoopFunc } from "./scripts/toolbox.js";
import {} from "./scripts/flatted.min.js";

game.start();

initTabManager();
setLoopFunc(runTabs);
renderSidebarObjects();
initRightClickMenuManager();
initCanvasSizer();
initAssetManager();
setupSaveButtonHandlers();

document.getElementById("AddObject").addEventListener("click", () => {
  addEmptyObject(selectedObject);
});
document.getElementById("more").addEventListener("click", () => {
  document.getElementById("dropdownMenu").classList.toggle("hidden");
});
/*
addInfoPopup(
  "Rick Roll!",
  `
  Never gonna give you up
  Never gonna let you down
  Never gonna run around and desert you
  Never gonna make you cry
  Never gonna say goodbye
  Never gonna tell a lie and hurt you
  
  Never gonna give you up
  Never gonna let you down
  Never gonna run around and desert you
  Never gonna make you cry
  Never gonna say goodbye
  Never gonna tell a lie and hurt you`
);
*/
