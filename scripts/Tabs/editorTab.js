/**
 * @description - This file contains the class for storing a open tab instance
 */

import {
  addOpenTab,
  closeTab,
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
  data;
  extraCharacters = "";
  /**
   *
   * @param {*} name
   * @param {*} type
   * @param {*} canBeClosed
   * @param {*} tabId
   * @description - Call this to make a new tab, it will be added to the open tab list automatically
   */
  constructor(name, type, canBeClosed = true, extraData, tabId = tabIdCounter) {
    tabIdCounter++;
    this.name = name;
    this.canBeClosed = true;
    this.type = type;
    this.data = extraData;

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

    //Add the X button
    tab.innerHTML = `${name} ${
      canBeClosed ? `<p class="closeEditorTab">X</p>` : ""
    }<p class="extraText" color = "white"></p>`;
    document.getElementById("navbarContainer").appendChild(tab);
    //If it can be closed, add the closing functionality
    if (canBeClosed) {
      tab
        .getElementsByClassName("closeEditorTab")[0]
        .addEventListener("click", (e) => {
          let elm = e.path[1];
          if (isTabActive(elm.id)) leaveCurrentTab();
          elm.remove();
          closeTab(elm.id);
        });
    }
    this.id = tab.id;
    //Add it to the list of open tabs
    addOpenTab(this);
    setActiveTab(tab.id, type);
  }

  showDot() {
    this.extraCharacters = "•";
    document
      .getElementById(this.id)
      .getElementsByClassName("extraText")[0].innerHTML = this.extraCharacters;
  }
  hideDot() {
    this.extraCharacters = "";
    document
      .getElementById(this.id)
      .getElementsByClassName("extraText")[0].innerHTML = this.extraCharacters;
  }

  setMetadata(data) {
    this.data = data;
    return this;
  }

  getMetadata() {
    return this.data;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}
