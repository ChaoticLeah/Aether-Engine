export let welcomeMessageTab = {
  init: () => {},
  loop: (tick) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("welcomeScreen").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("welcomeScreen").style.display = "none";
  },
};
