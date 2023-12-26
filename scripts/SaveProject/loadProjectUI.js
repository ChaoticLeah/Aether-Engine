import { readFile } from "../AssetPanel/FileUpload/uploadSaver.js";
import { addInfoPopup, popupTypes } from "../Popups/popupManager.js";
import {
  closeTab,
  getOpenTab,
  getOpenTabId,
  setActiveTab,
} from "../Tabs/tabManager.js";
import { UploadFile } from "../toolbox.js";
import { loadProject } from "./saveManager.js";

export function createUI() {
  let uiHtml = `<div id = "loadBoxContent">
      <div id = "titleLoadDivContainer">
        <h2>Load Project</h2>
        <div id = "closeLoadBoxContainer"><button id = "closeLoadBox">X</button></div>
      </div>

      <div id = "uploadFile">
        <!--<input type = "file" id = "loadBoxInput" name = "loadBoxInput" />-->

        <button id = "loadBoxInput" class = "button" for="loadProject">Upload Save</button>

      </div>
      <div id = "oldSaves">

      </div>
    </div>`;
  /**
   *         <button id = "loadBoxInput"  for="loadProject">Upload Save</button>

             <div class = "saveContainer">
          <div class = "saveLoaderTitleHolder">
          <h2 class = "saveTitle">Test</h2>
          </div>
        <button class = "loadSave">Load</button>
        </div>
     */

  let ui = document.createElement("div");
  ui.innerHTML = uiHtml;
  ui.id = "loadBox";

  document.body.appendChild(ui);

  //close the window when X is clicked
  document.getElementById("closeLoadBox").addEventListener("click", () => {
    console.log(ui);
    document.body.removeChild(ui);
  });

  //add the saves from the local storage
  let saves = [...Object.keys(localStorage)].filter((key) =>
    key.includes("AetherEngineSave-")
  );
  saves.forEach((save) => {
    let saveName = save.split("-")[1];
    let saveHolder = document.createElement("div");
    saveHolder.classList.add("saveContainer");

    let saveLoaderTitleHolder = document.createElement("div");
    saveLoaderTitleHolder.classList.add("saveLoaderTitleHolder");
    saveHolder.appendChild(saveLoaderTitleHolder);

    let saveTitle = document.createElement("h2");
    saveTitle.classList.add("saveTitle");
    saveTitle.innerText = saveName;
    saveLoaderTitleHolder.appendChild(saveTitle);

    let loadSave = document.createElement("button");
    loadSave.classList.add("loadSave");
    loadSave.setAttribute("loadName", save);
    loadSave.innerText = "Load";

    saveHolder.appendChild(loadSave);

    //add the save to the old saves
    document.getElementById("oldSaves").appendChild(saveHolder);

    document.getElementById("loadBoxInput").addEventListener("click", () => {
      UploadFile((files) => {
        if (files.length < 1) return;
        let file = files[0];
        readFile(file, (text) => {
          try {
            loadProject(Flatted.parse(text));
          } catch (err) {
            addInfoPopup(
              "Error",
              `Error When loading file\n ${err}`,
              popupTypes.ERROR
            );
          }
        });
      }, ".aether");

      document.body.removeChild(ui);
    });

    loadSave.addEventListener("click", (e) => {
      loadProject(
        Flatted.parse(localStorage.getItem(e.target.getAttribute("loadName")))
      );
      // console.log("Loaded project");
      //close the welcome tab and switch to the project tab
      
      //getOpenTab().close();
      setActiveTab("EditorId");

      setActiveTab(getOpenTabId());
      document.body.removeChild(ui);
    });
  });
}
