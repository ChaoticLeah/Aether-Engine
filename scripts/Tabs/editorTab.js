import {
  addOpenTab,
  isTabActive,
  leaveCurrentTab,
  setActiveTab,
} from "./TabManager.js";

let tabIdCounter = 0;

export class EditorTab {
  name;
  canBeClosed;
  id;
  name;
  type;
  constructor(name, type, canBeClosed = true, tabId = tabIdCounter) {
    tabIdCounter++;
    this.name = name;
    this.canBeClosed = true;
    this.type = type;

    //Add the tab
    let tab = document.createElement("div");

    //Add date.now so that there is not a problem with 2 of the same named documents opening
    tab.id = tabId;
    tab.setAttribute("type", type);

    tab.className = "navbarTab";
    tab.addEventListener("click", (e) => {
      let elm = e.path[0];
      //If X was clicked, ignore it
      if (elm.innerHTML != "X") {
        //When swapping tabs run the code to swap them
        setActiveTab(elm.id, elm.getAttribute("type"));
      }
    });
    tab.innerHTML = `${name} ${
      canBeClosed ? `<p class="closeEditorTab">X</p>` : ""
    }`;
    document.getElementById("navbarContainer").appendChild(tab);
    if (canBeClosed) {
      tab
        .getElementsByClassName("closeEditorTab")[0]
        .addEventListener("click", (e) => {
          let elm = e.path[1];
          if (isTabActive(elm.id)) leaveCurrentTab();
          elm.remove();
        });
    }
    this.id = tab.id;
    //Add it to the list of open tabs
    addOpenTab(this);
    setActiveTab(tab.id, type);
  }
}
