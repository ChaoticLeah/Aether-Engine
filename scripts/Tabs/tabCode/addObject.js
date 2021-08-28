export let addObject = {
  loop: (tick) => {},
  onChange: (tabId, elm, extraData) => {
    document.getElementById("ObjectTypeSelect").style.display = "inline";
  },
  onLeave: (tabId, elm, extraData) => {
    document.getElementById("ObjectTypeSelect").style.display = "none";
  },
};
