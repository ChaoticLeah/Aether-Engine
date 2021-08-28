export let gameVisualEditor = {
  loop: (tick) => {},
  onChange: (tabId, elm, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "inline";
  },
  onLeave: (tabId, elm, extraData) => {
    document.getElementById("GameEditorPanel").style.display = "none";
  },
};
