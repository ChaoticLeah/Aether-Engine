import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { fill, rect } from "../../toolbox.js";
import { Component } from "./component.js";

export class RectangleComponent extends Component {
  componentName = Component.RectangleComponent || "Rectangle Component";

  constructor(parentObject, color) {
    if (typeof color != "object") color = { color: color };
    super(parentObject, color);
    this.objectPropertyTypes = {
      color: propertyTypes.COLOR_SELECT,
    };
  }

  init(parentObject, color = "#ff0000") {
    this.parentObject = parentObject;
    this.properties = { color: color };
  }

  initValues() {}

  //This one is ran in the editor
  display() {
    fill(this.properties.color);
    rect(
      this.parentObject.getGlobalOffsetX(),
      this.parentObject.getGlobalOffsetY(),
      this.parentObject.getW(),
      this.parentObject.getH()
    );
  }

  //This one isnt ran in the editor
  update() {}
}
