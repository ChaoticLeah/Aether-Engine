import { getObject } from "../ObjectManager.js";
import { Component } from "./component.js";
import { ImageComponent } from "./imageComponent.js";
import { RectangleComponent } from "./rectangleComponent.js";
import { TextComponent } from "./textComponent.js";

let components = new Map();
init();
function init() {
  Component.RectangleComponent = "Rectangle Component";
  Component.ImageComponent = "Image Component";
  Component.TextComponent = "Text Component";

  components.set(Component.RectangleComponent, new RectangleComponent());
  components.set(Component.ImageComponent, new ImageComponent());
  components.set(Component.TextComponent, new TextComponent());
}

export function getComponents() {
  return Object.values(components);
}

export function getComponentByName(name) {
  return Object.create(components.get(name));
}

export function addComponent(objId, componentName) {
  let component = Object.create(components.get(componentName));
  let object = getObject(objId);

  component.init(object);
  object.addComponent(component);
}
