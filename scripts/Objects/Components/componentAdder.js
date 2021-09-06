import { getObject } from "../ObjectManager.js";
import { Component } from "./component.js";
import { ImageComponent } from "./imageComponent.js";
import { RectangleComponent } from "./rectangleComponent.js";
import { TextComponent } from "./textComponent.js";

let components = new Map();
init();
function init() {
  Component.RectangleComponent = "RectangleComponent";
  Component.ImageComponent = "ImageComponent";
  Component.TextComponent = "TextComponent";

  components.set(RectangleComponent.name, new RectangleComponent());
  components.set(ImageComponent.name, new ImageComponent());
  components.set(TextComponent.name, new TextComponent());
}

export function getComponents() {
  return Object.values(components);
}

export function addComponent(objId, componentName) {
  let component = Object.create(components.get(componentName));
  let object = getObject(objId);

  component.init(object);
  object.addComponent(component);
}
