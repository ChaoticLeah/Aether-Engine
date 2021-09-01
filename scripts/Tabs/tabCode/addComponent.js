import { reloadSelection } from "../../ObjectEditorTab/ObjectEditorManager.js";
import { Component } from "../../Objects/Components/component.js";
import { addComponent as addComponentToObj } from "../../Objects/Components/componentAdder.js";
import { getObject } from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
function addButton(name, id) {
  let button = document.createElement("button");
  button.innerHTML = name;
  //button.classList.add("");
  button.id = id;
  button.addEventListener("click", () => {
    addComponentToObj(selectedObject, id);
    reloadSelection(selectedObject, getObject(selectedObject));
  });

  document.getElementById("ComponentSelect").appendChild(button);
}

export let addComponent = {
  init: () => {
    console.log("inited");
    addButton("Rectangle Component", Component.RectangleComponent);
    document.getElementById("");
  },
  loop: (tick, selectedObject) => {
    //console.log(tick, selectedObject);
    let objectId = selectedObject;
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "none";
  },
};
