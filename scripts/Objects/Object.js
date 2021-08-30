let idCounter = 0;
export let inEditor = true;
export class GameObject {
  name = "Object";
  enabled = true;

  id;
  x = 0;
  y = 0;
  w = 10;
  h = 10;
  parentObjectId = undefined;

  components = [];
  childrenObjectIds = [];
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = idCounter++;
  }

  render() {
    if (!this.enabled) return;
    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      if (!inEditor) {
        component.update();
      }
      component.display();
    }
  }

  addChild(child) {
    this.childrenObjectIds.push(child);
  }

  addComponent(component) {
    this.components.push(component);
  }
}
