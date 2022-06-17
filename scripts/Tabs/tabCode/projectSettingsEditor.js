export let projectSettingsTab = {
  init: () => {},
  loop: (tick, selectedObject) => {},
  onChange: (tabId, tabName, extraData) => {
    //TODO: LOAD THE PROJECT SETTINGS and display them

    document.getElementById("projectSettings").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    //delete anything that is in the project settings
    //TODO: ONLY DELETE SETTINGS, not sidebar elements
    document.getElementById("projectSettings").innerHTML = "";

    document.getElementById("projectSettings").style.display = "none";
  },
};
