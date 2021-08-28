export let jsCodeEditor = {
  loop: (tick) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("codeWrapper").style.display = "none";
  },
};
