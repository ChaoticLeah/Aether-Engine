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
    topBar.innerHTML = name;
    topBar.classList.add("topBarPopup");
    contentArea.classList.add("contentAreaPopup");
    this.mainDiv.appendChild(topBar);
    this.mainDiv.appendChild(contentArea);
    document.getElementById("popupHolder").appendChild(this.mainDiv);

    //Make it draggable
    $(`#${this.mainDiv.id}`).draggable({
      handle: "div.topBarPopup",
      containment: "window",
    });
  }

  addElement(element) {
    this.mainDiv
      .getElementsByClassName("contentAreaPopup")[0]
      .appendChild(element);
  }
}
