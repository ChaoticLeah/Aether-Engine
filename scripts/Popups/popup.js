import { removePopup } from "./popupManager.js";

export class Popup {
  mainDiv;
  name;
  /**
   *
   * @deprecated - use addPopup() instead
   */
  constructor(name, popupId) {
    this.name = name;
    this.mainDiv = document.createElement("div");
    this.mainDiv.classList.add("popup");
    this.mainDiv.id = "popup" + popupId;
    let contentArea = document.createElement("div");
    let topBar = document.createElement("div");
    //topBar.innerHTML = name;
    let popupName = document.createElement("p");
    popupName.innerHTML = name;
    topBar.appendChild(popupName);
    topBar.classList.add("topBarPopup");
    let xButton = document.createElement("p");
    xButton.classList.add("xButton");
    xButton.innerHTML = "X";
    xButton.addEventListener("click", (e) => {
      e.target.parentNode.parentNode.remove();
      removePopup(popupId);
    });
    topBar.appendChild(xButton);

    contentArea.classList.add("contentAreaPopup");
    this.mainDiv.appendChild(topBar);
    this.mainDiv.appendChild(contentArea);
    document.getElementById("popupHolder").appendChild(this.mainDiv);

    //Make it draggable
    $(`#${this.mainDiv.id}`).draggable({
      handle: "div.topBarPopup",
      containment: "document",
    });
  }

  addElement(element) {
    this.mainDiv
      .getElementsByClassName("contentAreaPopup")[0]
      .appendChild(element);
  }
}
