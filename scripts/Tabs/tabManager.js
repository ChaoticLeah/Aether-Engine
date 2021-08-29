import { EditorTab } from "./editorTab.js";
import { addComponent } from "./tabCode/addComponent.js";
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
  new TabType("AddComponent").setFile(addComponent).pushType();

  //Add the tabs
  new EditorTab("Editor", "GameVisualEditor", false, defualtTab);
  new EditorTab("Test Tab", "JsCodeEditor", true);
  hideAllTabElements();
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
  addOpenTab(new EditorTab(tabName, tabId).addMetadata(metadata));
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
  tabTypes
    .get(type)
    .onChange(tabId, openTabs.get(tabId).name, getActiveTabMetadata());

  //Visually toggle the tab
  document.getElementById(tabId).classList.add("ButtonToggledOn");

  activeTab = tabId;
}

export function closeTab(tabId) {
  //Remove it
  openTabs.set(tabId, undefined);
}

export function leaveCurrentTab() {
  //Run the leaving code for the last tab
  if (getOpenTab() != undefined)
    tabTypes
      .get(getOpenTab().type)
      .onLeave(activeTab, getOpenTab().name, getActiveTabMetadata());

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
/*export function getTabInitFunction(id) {
  return tabTypes.get(openTabs.get(id).type).init;
}*/
export function getActiveTabLoopFunction() {
  if (getOpenTab() != undefined) return tabTypes.get(getOpenTab().type).tabLoop;
}
export function getActiveTabMetadata() {
  if (getOpenTab() != undefined) return tabTypes.get(getOpenTab().type).data;
}
