import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";
import { Component } from "./component.js";

export class ImageComponent extends Component {
  componentName = "Image Component";

  //image = undefined;
  constructor(parentObject, image) {
    super(parentObject, { image: image });
    this.objectPropertyTypes = {
      image: propertyTypes.FILE_INPUT,
    };
  }

  init(parentObject, image = "") {
    this.parentObject = parentObject;
    this.properties = { image: image };
  }

  initValues() {
    if (this.properties.image == "") return;
    if (
      getFile(this.properties.image) == undefined ||
      getFile(this.properties.image).type != File.TYPE.IMAGE
    ) {
      addInfoPopup(
        "Error",
        `you tried adding a invalid file to this component`,
        popupTypes.ERROR
      );

      return;
    }
  }

  //This one is ran in the editor
  display() {
    if (getFile(this.properties.image) != undefined)
      renderImage(
        getFile(this.properties.image).data,
        this.parentObject.getX(),
        this.parentObject.getY(),
        this.parentObject.getW(),
        this.parentObject.getH()
      );
  }

  //This one isnt ran in the editor
  update() {}
}
