//This runs the code for each tab that needs to be ran

import {
  getActiveTabLoopFunction,
  getActiveTabMetadata,
} from "./TabManager.js";

let tick = 0;

export function runTabs() {
  tick++;

  let activeTab = getActiveTabLoopFunction();
  if (!!activeTab) activeTab(tick, getActiveTabMetadata());
  else {
  }
}
