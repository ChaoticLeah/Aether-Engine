import { Popup } from "./popup.js";

let popups = [];

export function addPopup(popupName) {
  popups.push(new Popup(popupName, popups.length));
  return popups.length - 1;
}

export function addInfoPopup(popupName, info) {
  let popupId = addPopup(popupName);
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
