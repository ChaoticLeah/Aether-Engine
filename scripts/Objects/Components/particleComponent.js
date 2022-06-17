import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { Component } from "./component.js";
import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";

export class ParticleComponent extends Component {
  componentName = Component.ParticleComponent || "Particle Component";

  childrenParticles = [];

  //image = undefined;
  constructor(parentObject, image) {
    if (typeof image != "object") image = { image: image };

    super(parentObject, image);
    this.objectPropertyTypes = {
      image: propertyTypes.FILE_INPUT,
      width: propertyTypes.NUMBER_INPUT,
      height: propertyTypes.NUMBER_INPUT,
      velocityX: propertyTypes.NUMBER_INPUT,
      velocityY: propertyTypes.NUMBER_INPUT,
      rotates: propertyTypes.BOOLEAN_INPUT,
      lifetime: propertyTypes.NUMBER_INPUT,
    };
  }

  init(
    parentObject,
    image = "",
    width = 0,
    height = 0,
    velocityX = 0,
    velocityY = 0,
    rotates = false
  ) {
    this.parentObject = parentObject;
    this.properties = {
      image: image,
      width: width,
      height: height,
      velocityX: velocityX,
      velocityY: velocityY,
      rotates: rotates,
      lifetime: 0,
    };
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
    if (getFile(this.properties.image) != undefined) {
      //loop through all the particles
      for (let i = 0; i < this.childrenParticles.length; i++) {
        let particle = this.childrenParticles[i];
        //draw the image
        renderImage(
          getFile(particle.image).data,
          this.parentObject.getX() + particle.x,
          this.parentObject.getY() + particle.y,
          particle.width,
          particle.height,
          particle.rotates,
          particle.velocityX,
          particle.velocityY,
          particle.lifetime
        );
        //update the position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.lifetime--;

        this.childrenParticles[i] = particle;
        //console.log(particle);
        //if the particle is dead, remove it
        if (particle.lifetime < 0) {
          this.childrenParticles.splice(i, 1);
        }
      }
      this.addParticle();
      // renderImage(
      //   getFile(this.properties.image).data,
      //   this.parentObject.getX(),
      //   this.parentObject.getY(),
      //   this.parentObject.getW(),
      //   this.parentObject.getH()
      // );
    }
  }

  //This one isnt ran in the editor
  update() {}

  addParticle() {
    //add it as a json object
    let particle = {
      image: this.properties.image,
      x: 0,
      y: 0,
      width: this.properties.width,
      height: this.properties.height,
      velocityX: this.properties.velocityX * Math.random(),
      velocityY: this.properties.velocityY * Math.random(),
      rotates: this.properties.rotates,
      lifetime: this.properties.lifetime,
    };
    this.childrenParticles.push(particle);
  }
}
