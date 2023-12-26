import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { Component } from "./component.js";
import { File } from "../../AssetPanel/file.js";
import { getFile } from "../../AssetPanel/fileManager.js";
import { addInfoPopup, popupTypes } from "../../Popups/popupManager.js";
import { fill, rect, renderImage } from "../../toolbox.js";
import { globalOffsetX, globalOffsetY } from "../Object.js";

export class ParticleComponent extends Component {
  componentName = Component.ParticleComponent || "Particle Component";

  childrenParticles = [];
  tick = 0
  //image = undefined;
  constructor(parentObject, image) {
    if (typeof image != "object") image = { image: image };

    super(parentObject, image);
    this.objectPropertyTypes = {
      image: propertyTypes.FILE_INPUT,
      emitting: propertyTypes.TOGGLE_INPUT,
      width: propertyTypes.NUMBER_INPUT,
      height: propertyTypes.NUMBER_INPUT,
      minVelocityX: propertyTypes.NUMBER_INPUT,
      maxVelocityX: propertyTypes.NUMBER_INPUT,
      minVelocityY: propertyTypes.NUMBER_INPUT,
      maxVelocityY: propertyTypes.NUMBER_INPUT,
      drag: propertyTypes.NUMBER_INPUT,
      spawnRate: propertyTypes.NUMBER_INPUT,
      rotates: propertyTypes.BOOLEAN_INPUT,
      lifetime: propertyTypes.NUMBER_INPUT,
    };
    
  }

  init(
    parentObject,
    image = "",
    width = 20,
    height = 20,
    velocityX = 10,
    velocityY = 10,
    rotates = false
  ) {
    this.parentObject = parentObject;
    this.properties = {
      emitting: true,
      image: image,
      width: width,
      height: height,
      minVelocityX: -velocityX,
      maxVelocityX: velocityX,
      minVelocityY: -velocityY,
      maxVelocityY: velocityY,
      drag: 0,
      spawnRate: 1,
      rotates: rotates,
      lifetime: 100,
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
    this.tick++
    if (getFile(this.properties.image) != undefined) {
      //loop through all the particles
      for (let i = 0; i < this.childrenParticles.length; i++) {
        let particle = this.childrenParticles[i];
        
        if(parseFloat(this.properties.drag) > 0){
          this.childrenParticles[i].velocityX /= parseFloat(this.properties.drag) + 1
          this.childrenParticles[i].velocityY /= parseFloat(this.properties.drag) + 1
        }
        //draw the image
        renderImage(
          getFile(particle.image).data,
          particle.x + globalOffsetX,
          particle.y + globalOffsetY,
          particle.width,
          particle.height,
          // particle.rotates,
          // particle.velocityX,
          // particle.velocityY,
          // particle.lifetime
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
      if(this.tick % parseFloat(this.properties.spawnRate) == 0 && this.properties.emitting)
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

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  addParticle() {
    //add it as a json object
    let particle = {
      image: this.properties.image,
      x: this.parentObject.getGlobalOffsetWithoutCameraX(),
      y: this.parentObject.getGlobalOffsetWithoutCameraY(),
      width: this.properties.width,
      height: this.properties.height,
      velocityX: parseFloat(this.properties.minVelocityX) + this.getRandomInt(parseFloat(this.properties.maxVelocityX) - parseFloat(this.properties.minVelocityX)),
      velocityY: parseFloat(this.properties.minVelocityY) + this.getRandomInt(parseFloat(this.properties.maxVelocityY) - parseFloat(this.properties.minVelocityY)),
      // velocityX: 10,
      // velocityY: 10,
      rotates: this.properties.rotates,
      lifetime: this.properties.lifetime,
    };
    this.childrenParticles.push(particle);
  }
}
