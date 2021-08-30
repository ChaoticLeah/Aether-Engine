import { fill, rect } from "../../toolbox.js";
import { Component } from "./component.js";

export class RectangleComponent extends Component {
  constructor(parentObject, color) {
    super(parentObject, { color: color });
  }

  init(parentObject, color = "pink") {
    this.parentObject = parentObject;
    this.properties = { color: color };
  }

  //This one is ran in the editor
  display() {
    fill(this.properties.color);
    rect(
      this.parentObject.x,
      this.parentObject.y,
      this.parentObject.w,
      this.parentObject.h
    );
  }

  //This one isnt ran in the editor
  update() {}
}
