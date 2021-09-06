let componentIdCounter = 0;
export class Component {
  parentObject;
  properties = {};
  objectPropertyTypes = {};
  enabled = true;
  componentId = 0;
  constructor(parentObject, properties, id = componentIdCounter++) {
    parentObject = parentObject;
    this.properties = properties;
    this.componentId = id;
  }

  //This one is ran in the editor
  display() {}

  //This one isnt ran in the editor
  update() {}

  get getProperties() {
    return this.properties;
  }
  set setProperties(properties) {
    this.properties = properties;
  }
}
Component.RectangleComponent = "RectangleComponent";
Component.ImageComponent = "ImageComponent";
