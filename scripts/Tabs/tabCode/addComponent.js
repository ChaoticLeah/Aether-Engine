export let addComponent = {
  init: () => {
    document.getElementById("");
  },
  loop: (tick, selectedObject) => {
    //console.log(tick, selectedObject);
    let objectId = selectedObject;
  },
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("ComponentSelect").style.display = "none";
  },
};
