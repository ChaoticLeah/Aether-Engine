export class RightClickMenuButton {
  text;
  onClickEvent;
  requiredElemClass;
  isParentElem;
  constructor(text, onClickEvent, requiredElemClass, isParentElem = false) {
    this.text = text;
    this.onClickEvent = onClickEvent;
    this.requiredElemClass = requiredElemClass;
    this.isParentElem = isParentElem;
  }
}
