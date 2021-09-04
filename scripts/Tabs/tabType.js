/**
 * @description - The point of this file is to contain the class that will define each possible tab type. Example: You can define a welcome screen with this class
 **/
import { addTabType } from "./TabManager.js";

//This is the class that shows and hides the elements when swapping tabs
export class TabType {
  tabType;
  data;
  constructor(tabType) {
    this.tabType = tabType;
  }

  //init
  init = () => {};

  //Called when its changed to that tab
  onChange = (tabId, tabName) => {};

  //Called when its changed to that tab
  tabLoop = () => {};

  //Called when you are leaving the tab
  onLeave = (tabId, tabName) => {};

  setOnChange(func) {
    this.onChange = func;
    return this;
  }

  setOnLeave(func) {
    this.onLeave = func;
    return this;
  }

  setTabLoop(func) {
    this.tabLoop = func;
    return this;
  }
  /**
   *
   * @param {JSON} funcJsonObj - takes in a json object containing all the valid functions
   * @returns - this
   */
  setFile(funcJsonObj) {
    this.onChange = funcJsonObj.onChange;
    this.tabLoop = funcJsonObj.loop;
    this.onLeave = funcJsonObj.onLeave;
    this.init = funcJsonObj.init;
    this.init();
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  pushType() {
    addTabType(this.tabType, this);
    //return this;
  }
}
