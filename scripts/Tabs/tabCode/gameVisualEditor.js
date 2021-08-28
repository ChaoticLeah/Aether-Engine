export let gameVisualEditor = {
  loop: (tick) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
