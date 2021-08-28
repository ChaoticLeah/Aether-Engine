import { EditorTab } from "./editorTab.js";
import { addObject } from "./tabCode/addObject.js";
import { gameVisualEditor } from "./tabCode/gameVisualEditor.js";
import { jsCodeEditor } from "./tabCode/jsCodeEditor.js";
import { TabType } from "./TabType.js";

export let defualtTab = "EditorId";

export let activeTab = defualtTab.toString();
export let openTabs = new Map();
export let tabTypes = new Map();

export function init() {
  //Add all the tab types
  new TabType("GameVisualEditor").setFile(gameVisualEditor).pushType();
  new TabType("JsCodeEditor").setFile(jsCodeEditor).pushType();
  new TabType("AddObject").setFile(addObject).pushType();

  //Add the tabs
  new EditorTab("Editor", "GameVisualEditor", false, defualtTab);
  new EditorTab("Test Tab", "JsCodeEditor", true);
}

export function addOpenTab(tab) {
  openTabs.set(tab.id, tab);
}

export function addTabType(type, tab) {
  tabTypes.set(type, tab);
}

export function setActiveTab(tabId, type = openTabs.get(tabId).type) {
  if (type == null) {
    setActiveTab(defualtTab, openTabs.get(tabId).type);
    return;
  }
  leaveCurrentTab();
  //Run the change to code
  tabTypes.get(type).onChange(tabId, openTabs.get(tabId).name);

  //Visually toggle the tab

  document.getElementById(tabId).classList.add("ButtonToggledOn");

  activeTab = tabId;
}

export function leaveCurrentTab() {
  //Run the leaving code for the last tab
  tabTypes
    .get(openTabs.get(activeTab).type)
    .onLeave(activeTab, openTabs.get(activeTab).name);

  //Visually toggle the tab

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

export function getActiveTabLoopFunction() {
  return tabTypes.get(openTabs.get(activeTab).type).tabLoop;
}
