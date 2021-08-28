import { addEmptyObject } from "./scripts/Objects/ObjectManager.js";
import {
  renderSidebarObjects,
  selected,
} from "./scripts/Objects/ObjectsTab.js";
import { init as initTabManager } from "./scripts/Tabs/tabManager.js";
import { runTabs } from "./scripts/Tabs/tabRunner.js";
import { setLoopFunc } from "./scripts/toolbox.js";

initTabManager();
setLoopFunc(runTabs);
renderSidebarObjects();

document.getElementById("AddObject").addEventListener("click", () => {
  addEmptyObject(selected);
});

$(function () {
  $("#leftPanel").resizable();
});
