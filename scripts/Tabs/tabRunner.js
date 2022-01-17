/**
 * @description - This file contains the code to run the loop function for the active tab
 */

//This runs the code for each tab that needs to be ran

import { resetMousePressed } from "../toolbox.js";
import {
  getActiveTabLoopFunction,
  getActiveTabMetadata,
  getOpenTab,
} from "./TabManager.js";

let tick = 0;

export function runTabs() {
  tick++;

  let activeTab = getActiveTabLoopFunction();
  if (!!activeTab) activeTab(tick, getActiveTabMetadata(), getOpenTab());
  else {
  }
  resetMousePressed();
}
