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
    let child = document.createElement("p");
    child.innerHTML = option.text;
    child.addEventListener("click", () => {
      option.onClickEvent();
      child.parentNode.outerHTML = "";
    });
    menu.appendChild(child);
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
