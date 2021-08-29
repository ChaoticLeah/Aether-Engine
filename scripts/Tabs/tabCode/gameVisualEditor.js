import { calcSize } from "../../Canvas/canvasSizer.js";

export let gameVisualEditor = {
  loop: (tick) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
    calcSize();
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
