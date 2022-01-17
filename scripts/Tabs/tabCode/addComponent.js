import { reloadSelection } from "../../ObjectEditorTab/ObjectEditorManager.js";
import { Component } from "../../Objects/Components/component.js";
import {
  addComponent as addComponentToObj,
  getComponents,
  getComponentsMap,
} from "../../Objects/Components/componentAdder.js";
import { getObject } from "../../Objects/ObjectManager.js";
import { selectedObject } from "../../Objects/ObjectsTab.js";
import { defualtTab, setActiveTab } from "../tabManager.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";

let requestClose = false;

function addButton(name, id) {
  let button = document.createElement("button");
  button.innerHTML = name;
  //button.classList.add("");
  button.id = id;
  button.addEventListener("click", () => {
    if (selectedObject == undefined) {
      addInfoPopup(
        "Error",
        `Please select an object to add a component to it`,
        popupTypes.ERROR
      );
      return;
    }

    addComponentToObj(selectedObject, id);
    reloadSelection(selectedObject, getObject(selectedObject));
    //Auto close tab
    requestClose = true;
  });

  document.getElementById("componentButtonHolder").appendChild(button);
}

export let addComponent = {
  init: () => {
    console.log("inited components");

    //Add all the add compnent buttons
    let comp = getComponentsMap();
    let componentKeys = [...comp.keys()];

    componentKeys.forEach((key) => {
      addButton(key, comp.get(key).componentName);
    });

    document
      .getElementById("componentSearch")
      .addEventListener("keyup", (e) => {
        filterElements(
          document.getElementById("componentButtonHolder"),
          e.target.value
        );
      });
  },
  loop: (tick, extraData, tab) => {
    //console.log(tick, selectedObject);
    //let objectId = selectedObject;
    if (requestClose) {
      tab.close();
      setActiveTab(defualtTab);
      requestClose = false;
    }
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "none";
  },
};

function filterElements(div, searchQuery) {
  var filter, ul, li, a, i, txtValue;
  filter = searchQuery.toUpperCase();
  li = div.getElementsByTagName("button");
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
