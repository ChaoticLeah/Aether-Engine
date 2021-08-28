//This runs the code for each tab that needs to be ran

import { getActiveTabLoopFunction } from "./TabManager.js";

let tick = 0;

export function runTabs() {
  tick++;

  let activeTab = getActiveTabLoopFunction();
  if (!!activeTab) activeTab(tick);
  else {
  }
}
