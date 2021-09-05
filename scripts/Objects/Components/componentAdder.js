import { getObject } from "../ObjectManager.js";
import { ImageComponent } from "./imageComponent.js";
import { RectangleComponent } from "./rectangleComponent.js";

let components = new Map();
init();
function init() {
  components.set(RectangleComponent.name, new RectangleComponent());
  components.set(ImageComponent.name, new ImageComponent());
}

export function addComponent(objId, componentName) {
  let component = Object.create(components.get(componentName));
  let object = getObject(objId);

  component.init(object);
  object.addComponent(component);
}
