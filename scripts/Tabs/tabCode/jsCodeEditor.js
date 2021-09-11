import { getFile, setFileData } from "../../AssetPanel/fileManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { openTabMetadata } from "../TabManager.js";

let change = false;
let saveFile = false;
export let jsCodeEditor = {
  init: () => {
    document
      .getElementsByClassName("CodeMirror")[0]
      .CodeMirror.on("change", function (cMirror) {
        //console.log(cMirror.getValue());
        change = true;
      });
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        saveFile = true;
      }
    });

    document.getElementById("addComponent").addEventListener("click", () => {
      if (selectedObject == undefined)
        addInfoPopup(
          "Error",
          `Please select an object to add a component to it`,
          popupTypes.ERROR
        );
      else openTabMetadata("Add Component", "AddComponent", selectedObject);
    });
  },
  loop: (tick, extraData, tab) => {
    if (change) {
      tab.showDot();
      change = false;
    }
    if (saveFile) {
      //Put the data into the tab element
      tab.setData(getCode());
      //Save it to the file
      setFileData(extraData.dir, getCode());
      tab.hideDot();
      saveFile = false;
    }
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "inline";
    if (extraData != undefined) {
      setCode(extraData.data);
      change = false;
    }
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "none";
  },
};

export function getCode() {
  return document
    .getElementsByClassName("CodeMirror")[0]
    .CodeMirror.getDoc()
    .getValue("\n");
}

export function setCode(str) {
  document.getElementsByClassName("CodeMirror")[0].CodeMirror.setValue(str);
}
