export class Component {
  parentObject;
  properties = {};

  constructor(parentObject, properties) {
    parentObject = parentObject;
    this.properties = properties;
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
