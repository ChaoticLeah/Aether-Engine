import { addTabType } from "./TabManager.js";

//This is the class that shows and hides the elements when swapping tabs
export class TabType {
  tabType;
  constructor(tabType) {
    this.tabType = tabType;
  }
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

  setFile(funcJsonObj) {
    this.onChange = funcJsonObj.onChange;
    this.tabLoop = funcJsonObj.loop;
    this.onLeave = funcJsonObj.onLeave;
    return this;
  }

  pushType() {
    addTabType(this.tabType, this);
    //return this;
  }
}
