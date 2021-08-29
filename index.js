import { initCanvasSizer } from "./scripts/Canvas/canvasSizer.js";
import { addEmptyObject } from "./scripts/Objects/ObjectManager.js";
import {
  renderSidebarObjects,
  selectedObject,
} from "./scripts/Objects/ObjectsTab.js";
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

document.getElementById("AddObject").addEventListener("click", () => {
  addEmptyObject(selectedObject);
});
