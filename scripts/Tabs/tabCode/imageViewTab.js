export let imageViewTab = {
  init: () => {
    document.getElementById("scale").addEventListener("change", (e) => {
      let val = e.target.value;
      document.getElementById(
        "imageViewTabImg"
      ).style.transform = `scale(${val}) translate(50%, 50%)`;
    });
  },
  loop: (tick, selectedObject) => {},
  onChange: (tabId, tabName, extraData) => {
    document.getElementById("imageViewTab").style.display = "inline";
  },
  onLeave: (tabId, tabName, extraData) => {
    document.getElementById("imageViewTab").style.display = "none";
  },
};
