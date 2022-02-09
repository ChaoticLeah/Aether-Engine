import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { Component } from "./component.js";

export class CoreObjectComponent extends Component {
  componentName = "Core Component";

  constructor(parentObject, data = {}) {
    if (typeof data != "object") data = { data: data };

    super(parentObject, data);
    this.objectPropertyTypes = {
      name: propertyTypes.TEXT_INPUT,
      enabled: propertyTypes.TOGGLE_INPUT,
      x: propertyTypes.NUMBER_INPUT,
      y: propertyTypes.NUMBER_INPUT,
      w: propertyTypes.NUMBER_INPUT,
      h: propertyTypes.NUMBER_INPUT,
    };
  }

  init(parentObject, properties) {
    this.parentObject = parentObject;
    this.properties = properties;
  }

  initValues() {
    this.parentObject.name = this.properties.name;
    this.parentObject.enabled = this.properties.enabled;

    this.parentObject.setX(this.properties.x);
    this.parentObject.setY(this.properties.y);
    this.parentObject.setW(this.properties.w);
    this.parentObject.setH(this.properties.h);
  }

  //This one is ran in the editor
  display() {}

  //This one isnt ran in the editor
  update() {}
}
