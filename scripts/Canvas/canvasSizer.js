import { leftPanelW } from "../Objects/ObjectsTab.js";
import { height, width } from "../toolbox.js";

export function reCalculateSize(tabWidth, tabHeight) {
  let canvas = document.getElementById("canvas");
  let leftPanelCanvas = document.getElementById("ObjectTreeCanvas");

  let leftPanelW =
    leftPanelCanvas.style.width != ""
      ? leftPanelCanvas.style.width
      : leftPanelCanvas.offsetWidth;

  canvas.style.left = leftPanelW + "px";
  canvas.style.top = 40 + "px";

  canvas.width = tabWidth - leftPanelW;
  canvas.height = tabHeight - 40;
}

export function calcSize() {
  reCalculateSize(width, height);
}

export function initCanvasSizer() {
  reCalculateSize(width, height);

  $(function () {
    $("#leftPanel").resizable({
      resize: function (e, ui) {
        reCalculateSize(width, height);
      },
    });
  });
}
