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
import { initRightClickMenuManager } from "./scripts/RightClickMenu/rightClickMenuManager.js";
import { setupSaveButtonHandlers } from "./scripts/SaveProject/saveProjectButtonManager.js";
import { init as initTabManager } from "./scripts/Tabs/tabManager.js";
import { runTabs } from "./scripts/Tabs/tabRunner.js";
import { game, setLoopFunc } from "./scripts/toolbox.js";
import {} from "./scripts/flatted.min.js";
import { compileCurrentProject } from "./scripts/Compiler/compilerManager.js";
import { loadProject } from "./scripts/SaveProject/saveManager.js";

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

window.onload = () => {
  //automatically click the load button and click the top one
  document.getElementById("welcomeLoad").click();
  //loop though all the loadsaves
  [...document.getElementsByClassName("loadSave")]
    .filter((button) => {
      try {
        if (button.getAttribute("loadName") == "AetherEngineSave-Demo")
          return true;
      } catch (e) {}
      return false;
    })[0]
    .click();
};

document.getElementById("play").addEventListener("click", () => {
  //launch a new window and inject the game
  compileCurrentProject();
  return;
  const win = window.open("", "", "width=1280,height=720");
  win.document.write(
    `TODO: PUT THE GAME HERE
    `
  );
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
