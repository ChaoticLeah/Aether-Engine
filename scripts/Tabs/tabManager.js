/**
 * @description - The point of this file is to keep track of all the open tabs and tab types. This includes their id's
 **/

import { EditorTab } from "./editorTab.js";
import { addComponent } from "./tabCode/addComponent.js";
import { gameVisualEditor } from "./tabCode/gameVisualEditor.js";
import { imageViewTab } from "./tabCode/imageViewTab.js";
import { jsCodeEditor } from "./tabCode/jsCodeEditor.js";
import { welcomeMessageTab } from "./tabCode/welcomeMessageTab.js";
import { TabType } from "./TabType.js";

export let defualtTab = "EditorId";

export let activeTab = defualtTab.toString();
export let openTabs = new Map();
export let tabTypes = new Map();

export function init() {
  //Add all the tab types
  new TabType("GameVisualEditor").setFile(gameVisualEditor).pushType();
  new TabType("JsCodeEditor").setFile(jsCodeEditor).pushType();
  new TabType("AddComponent").setFile(addComponent).pushType();
  new TabType("welcomeMessageTab").setFile(welcomeMessageTab).pushType();
  new TabType("imageViewTab").setFile(imageViewTab).pushType();

  //Add the tabs
  new EditorTab("Editor", "GameVisualEditor", false, undefined, defualtTab);

  hideAllTabElements();
  new EditorTab("Welcome!", "welcomeMessageTab", true, undefined, "WelcomeTab");
}

function hideAllTabElements() {
  let tabElements = document.getElementById("tabElementHolder").children;

  for (let i = 0; i < tabElements.length; i++) {
    tabElements[i].style.display = "none";
  }
}

export function addOpenTab(tab) {
  openTabs.set(tab.id, tab);
}

export function openTab(tabName, tabId) {
  addOpenTab(new EditorTab(tabName, tabId));
}

export function openTabMetadata(tabName, tabId, metadata) {
  addOpenTab(new EditorTab(tabName, tabId).setMetadata(metadata));
}

export function addTabType(type, tab) {
  tabTypes.set(type, tab);
}

export function setActiveTab(tabId, type = undefined) {
  try {
    if (type == undefined) type = openTabs.get(tabId).type;
    if (type == null) {
      setActiveTab(defualtTab, openTabs.get(tabId).type);
      return;
    }
  } catch (e) {}
  leaveCurrentTab();

  //Run the change to code
  tabTypes
    .get(type)
    .onChange(tabId, openTabs.get(tabId).name, getTabMetadata(tabId));

  //Visually toggle the tab
  document.getElementById(tabId).classList.add("ButtonToggledOn");

  activeTab = tabId;
}

export function closeTab(tabId) {
  //Remove it
  openTabs.delete(tabId);
}

export function leaveCurrentTab() {
  //Run the leaving code for the last tab
  if (getOpenTab() != undefined)
    tabTypes
      .get(getOpenTab().type)
      .onLeave(activeTab, getOpenTab().name, getOpenTabType());

  //Visually toggle the tab to show its not selected
  document.getElementById("navbarContainer").childNodes.forEach((elem) => {
    elem.classList.remove("ButtonToggledOn");
  });
}

export function isTabActive(id) {
  return activeTab == id;
}

export function getCurrentTab() {
  return activeTab;
}

export function getOpenTab() {
  return openTabs.get(activeTab);
}

export function getOpenTabId() {
  return openTabs.get(activeTab).id;
}
/*export function getTabInitFunction(id) {
  return tabTypes.get(openTabs.get(id).type).init;
}*/
/*
export function setTabData(id, data) {
  tabTypes.get(id).setData(data);
}*/

export function setActiveTabMetadata(data) {
  getOpenTab().setMetadata(data);
}

export function getActiveTabLoopFunction() {
  if (getOpenTab() != undefined) return tabTypes.get(getOpenTab().type).tabLoop;
}
export function getActiveTabMetadata() {
  if (getOpenTab() != undefined) return getOpenTab().getMetadata();
}
export function getTabMetadata(id) {
  if (getOpenTab() != undefined) return openTabs.get(id).getMetadata();
}

export function getOpenTabType() {
  if (getOpenTab() != undefined) return tabTypes.get(getOpenTab().type);
}
