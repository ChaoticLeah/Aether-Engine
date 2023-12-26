import { propertyTypes } from "../../ObjectEditorTab/propertyTypes.js";
import { fill, rect } from "../../toolbox.js";
import { DIR_ENUM, checkCollisionsWithRigidbody } from "../ObjectManager.js";
import { Component } from "./component.js";

export class RigidbodyComponent extends Component {
  componentName = Component.RigidbodyComponent || "Rigidbody Component";
  onGround = false
  touchingLeftWall = false
  touchingRightWall = false
  constructor(parentObject, color) {
    if (typeof color != "object") color = { color: color };
    super(parentObject, color);
    this.objectPropertyTypes = {
        velocityX: propertyTypes.NUMBER_INPUT,
        velocityY: propertyTypes.NUMBER_INPUT,
        applyGravity:  propertyTypes.TOGGLE_INPUT,
        mass: propertyTypes.NUMBER_INPUT,
        damping: propertyTypes.NUMBER_INPUT,
        terminalVelocity: propertyTypes.NUMBER_INPUT,
    };
  }

  init(parentObject, color = "#ff0000") {
    this.parentObject = parentObject;
    this.properties = { velocityX: 0, velocityY: 0, applyGravity: true, mass: 1, damping: 0.98, terminalVelocity: 10 };
  }

  initValues() {}

  //This one is ran in the editor
  display() {}

  jump(force){
    if(this.onGround){
        this.properties.velocityY -= force
    }
  }

  //This one isnt ran in the editor
  update() {
    const gravity = 0.5; // Adjust as needed

    // Apply gravitational force
    if(this.properties.applyGravity)
        this.properties.velocityY += gravity;
    
    // Apply terminal velocity
    this.properties.velocityY = Math.min(this.properties.velocityY, this.properties.terminalVelocity);


    // Assume checkCollisionsWithRigidbody(this.parentObject) returns the array
    var collisionsArray = checkCollisionsWithRigidbody(this.parentObject);

    let downCollidingObject = collisionsArray.find(function (collision) {
        return collision.direction.includes(DIR_ENUM.BOTTOM_LEFT) || collision.direction.includes(DIR_ENUM.BOTTOM_RIGHT);
    })

    this.onGround = downCollidingObject != undefined

    this.touchingLeftWall = (collisionsArray.find(function (collision) {
      return collision.direction.includes(DIR_ENUM.TOP_LEFT);
    }) != undefined)

    this.touchingRightWall = (collisionsArray.find(function (collision) {
      return collision.direction.includes(DIR_ENUM.TOP_RIGHT);
    }) != undefined)

    // You may want to add collision detection and response logic here
    if(this.onGround){
        if(this.properties.velocityY > 0)
            this.properties.velocityY = 0
            // this.parentObject.incrementY(-0.1);
            //this.parentObject.setY(collidingObject.object.getYWithoutEditorOffsetScreenCoords() - (this.parentObject.getHWithoutEditorOffsetScreenCoords()))
            //console.log(collidingObject.object)
    }
    
    if(this.touchingLeftWall && this.properties.velocityX < 0)
      this.properties.velocityX = 0
    if(this.touchingRightWall && this.properties.velocityX > 0)
      this.properties.velocityX = 0

    // Update position using Euler integration
    this.parentObject.incrementX(this.properties.velocityX);
    this.parentObject.incrementY(this.properties.velocityY);

    // Apply damping (air resistance or friction) to simulate a more realistic motion
    const damping = this.properties.damping; // Adjust as needed
    this.properties.velocityX *= damping;
    //this.properties.velocityY *= damping;
  }
}
