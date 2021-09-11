import { Popup } from "./popup.js";

let popups = [];

export let popupTypes = { ERROR: "error", INFO: "info" };

export function addPopup(popupName, type = popupTypes.INFO) {
  popups.push(new Popup(popupName, popups.length));
  if (type == popupTypes.ERROR) {
    $(document.body).effect("shake", { distance: 10 });
  }
  return popups.length - 1;
}

export function addInfoPopup(popupName, info, type = popupTypes.INFO) {
  let popupId = addPopup(popupName, type);
  let text = document.createElement("p");
  text.innerHTML = info;
  getPopup(popupId).addElement(text);
}

export function getPopup(index) {
  return popups[index];
}

export function getPopupByName(name) {
  for (let i = 0; i < popups.length; i++) {
    if (popups[i].name === name) return popups[i];
  }
}

export function removePopup(index) {
  popups.splice(index, 1);
}
