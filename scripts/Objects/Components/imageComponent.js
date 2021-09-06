import { getFile } from "../../AssetPanel/fileManager.js";
import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { addInfoPopup } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";
import { Component } from "./component.js";

export class ImageComponent extends Component {
  componentName = "Image Component";

  image = undefined;
  constructor(parentObject, image) {
    super(parentObject, { image: image });
    this.objectPropertyTypes = {
      image: propertyTypes.FILE_INPUT,
    };
  }

  init(parentObject, image) {
    this.parentObject = parentObject;
    this.properties = { image: image };
  }

  initValues() {
    if (getFile(this.properties.image) == undefined) {
      addInfoPopup(
        "Error",
        `you tried adding a invalid file to this component`
      );

      return;
    }
    this.image = new Image();
    this.image.src = getFile(this.properties.image).data;
  }

  //This one is ran in the editor
  display() {
    if (this.image != undefined)
      renderImage(
        this.image,
        this.parentObject.getX(),
        this.parentObject.getY(),
        this.parentObject.getW(),
        this.parentObject.getH()
      );
  }

  //This one isnt ran in the editor
  update() {}
}
