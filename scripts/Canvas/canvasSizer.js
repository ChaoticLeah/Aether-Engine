import { leftPanelW } from "../Objects/ObjectsTab.js";
import { height, width } from "../toolbox.js";

export function reCalculateSize(tabWidth, tabHeight) {
  let canvas = document.getElementById("canvas");
  let leftPanelCanvas = document.getElementById("ObjectTreeCanvas");
  let rightPanelCanvas = document.getElementById("rightPanel");

  let leftPanelW = leftPanelCanvas.offsetWidth;

  let rightPanelW = rightPanelCanvas.offsetWidth;

  canvas.style.left = leftPanelW + "px";
  canvas.style.top = 40 + "px";
  canvas.width = tabWidth - leftPanelW - rightPanelW;
  canvas.height =
    tabHeight - 40 - document.getElementById("bottomPanel").offsetHeight;

  console.log(document.getElementById("bottomPanel").offsetHeight);
  //Calculate the bottom panel size
  document.getElementById("bottomPanel").style.left = `${leftPanelW}px`;
  document.getElementById("bottomPanel").style.width = `${
    width - (leftPanelW + rightPanelW)
  }px`;
}

export function getCanvasSize() {
  let canvas = document.getElementById("canvas");

  let w = canvas != null ? canvas.offsetWidth : 0;
  let h = canvas != null ? canvas.offsetHeight : 0;

  return { w: w, h: h };
}

export function calcSize() {
  reCalculateSize(width, height);
}

export function initCanvasSizer() {
  reCalculateSize(width, height);

  $(function () {
    $("#leftPanel").resizable({
      handles: "e",
      resize: function (e, ui) {
        reCalculateSize(width, height);
      },
    });
  });

  $(function () {
    $("#rightPanel").resizable({
      handles: "w",

      resize: function (e, ui) {
        reCalculateSize(width, height);
      },
    });
  });

  $(function () {
    $("#bottomPanel").resizable({
      handles: "n",

      resize: function (e, ui) {
        reCalculateSize(width, height);
      },
    });
  });
}
