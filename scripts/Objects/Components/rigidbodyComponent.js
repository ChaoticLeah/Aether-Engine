import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { fill, rect } from "../../toolbox.js";
import { Component } from "./component.js";

export class RigidbodyComponent extends Component {
  componentName = Component.RigidbodyComponent || "Rigidbody Component";

  constructor(parentObject, color) {
    if (typeof color != "object") color = { color: color };
    super(parentObject, color);
    this.objectPropertyTypes = {
        velocityX: propertyTypes.NUMBER_INPUT,
        velocityY: propertyTypes.NUMBER_INPUT,
        mass: propertyTypes.NUMBER_INPUT,
        damping: propertyTypes.NUMBER_INPUT,
    };
  }

  init(parentObject, color = "#ff0000") {
    this.parentObject = parentObject;
    this.properties = { velocityX: 0, velocityY: 0, mass: 1, damping: 0.98 };
  }

  initValues() {}

  //This one is ran in the editor
  display() {}

  //This one isnt ran in the editor
  update() {
    const gravity = 0.5; // Adjust as needed

    // Apply gravitational force
    this.properties.velocityY += gravity;

    // Update position using Euler integration
    this.parentObject.incrementX(this.properties.velocityX);
    this.parentObject.incrementY(this.properties.velocityY);

    // You may want to add collision detection and response logic here
    


    // Apply damping (air resistance or friction) to simulate a more realistic motion
    const damping = this.properties.damping; // Adjust as needed
    this.properties.velocityX *= damping;
    this.properties.velocityY *= damping;
  }
}
