export let addComponent = {
  loop: (tick, selectedObject) => {
    //console.log(tick, selectedObject);
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "none";
  },
};
