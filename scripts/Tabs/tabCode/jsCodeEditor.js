export let jsCodeEditor = {
  loop: (tick) => {},
  onChange: (tabId, elm, extraData) => {
    document.getElementById("codeWrapper").style.display = "inline";
  },
  onLeave: (tabId, elm, extraData) => {
    document.getElementById("codeWrapper").style.display = "none";
  },
};
