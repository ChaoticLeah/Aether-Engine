import {
  reloadDirectory,
  removeDir,
  removeFile,
} from "../AssetPanel/fileManager.js";
import { selectedObject } from "../Objects/ObjectsTab.js";
import { openTabMetadata } from "../Tabs/TabManager.js";
import { RightClickMenuButton } from "./rightClickMenuButton.js";

let rightClickOptions = new Map();

export function initRightClickMenuManager() {
  addRightClickOption(
    new RightClickMenuButton("Add Component To Selected Object", () => {
      openTabMetadata("Add Component", "AddComponent", selectedObject);
    })
  );

  addRightClickOption(
    new RightClickMenuButton(
      "Delete",
      (target) => {
        target = target.parentNode;
        //Get the path to the file/folder
        let cls = target.className
          .split(" ")
          .find((cls) => {
            return cls.includes("path:");
          })
          .replace("path:", "");

        //We dont know if its a file or directory, so try both
        removeFile(cls);
        removeDir(cls);
        //Reload it to show the changes
        reloadDirectory();
      },
      "file",
      true
    )
  );

  addRightClickOption(
    new RightClickMenuButton("Save Project", () => {
      alert("This feature is not done");
    })
  );

  addRightClickOption(
    new RightClickMenuButton("Download Project", () => {
      alert("This feature is not done");
    })
  );
  addRightClickOption(
    new RightClickMenuButton("Export Project", () => {
      alert("This feature is not done");
    })
  );
}

oncontextmenu = (e) => {
  e.preventDefault();
  let menu = document.createElement("div");
  menu.id = "ctxmenu";
  menu.style = `top:${e.pageY - 10}px;left:${e.pageX - 40}px`;
  menu.onmouseleave = () => (ctxmenu.outerHTML = "");
  for (let [key, option] of rightClickOptions) {
    let show = true;
    //Check requirements (see if right clicked element has the required class)
    if (option.requiredElemClass != undefined) {
      if (option.isParentElem) {
        if (
          !e.target.parentNode.className
            .split(" ")
            .includes(option.requiredElemClass)
        )
          show = false;
      } else {
        if (!e.target.className.split(" ").includes(option.requiredElemClass))
          show = false;
      }
    }

    if (show) {
      let child = document.createElement("p");
      child.innerHTML = option.text;
      child.addEventListener("click", () => {
        option.onClickEvent(e.target);
        child.parentNode.outerHTML = "";
      });
      menu.appendChild(child);
    }
  }

  document.body.appendChild(menu);
};

export function addRightClickOption(option) {
  rightClickOptions.set(option.text, option);
}

export function setRightClickOption(options) {
  rightClickOptions.clear();
  options.forEach((option) => {
    addRightClickOption(option);
  });
}
