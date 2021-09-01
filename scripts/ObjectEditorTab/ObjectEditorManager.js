//TODO: When a object is selected a onselect func should be ran, also on de-select one should be ran

//import { getObject, objects } from "../Objects/objectManager.js";

let propId = 0;

export function reloadSelection(objectId, object) {
  onObjectDeSelect(objectId, object);
  onObjectSelect(objectId, object);
}

export function onObjectSelect(objectId, object) {
  propId++;
  let obj = object;
  let components = obj.components;
  //Loop though all the components
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    let properties = component.properties;
    let propertyKeys = Object.keys(properties);
    let propertyTypes = component.objectPropertyTypes;

    let div = document.createElement("div");
    //add the label saying what property is is from
    let txt = document.createElement("h4");
    txt.innerHTML = `${component.constructor.name} :<br><br>`;
    div.appendChild(txt);

    div.classList.add("property");
    //add all the property controls
    for (let j = 0; j < propertyKeys.length; j++) {
      let propertyKey = propertyKeys[j];
      let propertyType = propertyTypes[propertyKey];
      let property = properties[propertyKey];

      let innerDiv = document.createElement("div");
      innerDiv.classList.add("propertyInnerDiv");
      let element = document.createElement(propertyType.elem);
      element.setAttribute("type", propertyType.type);
      //Load the current value
      element.value = object.components[i].properties[propertyKey];
      element.id = `control${propId}`;
      //Check for changes in value
      element.addEventListener("change", (e) => {
        var value = document.getElementById(`control${propId}`).value;
        //Save the new value
        object.components[i].properties[propertyKey] = value;
        console.log(value);
      });
      //Add the label for what that value is
      let text = document.createElement("p");
      text.innerHTML = `${
        propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1)
      } :`;
      innerDiv.appendChild(text);

      innerDiv.appendChild(element);

      div.appendChild(innerDiv);
    }

    document.getElementById("propertyHolder").appendChild(div);
  }
}

export function onObjectDeSelect(objectId, object) {
  console.log("DESELECTED", objectId);
  //Remove them all
  document.getElementById("propertyHolder").innerHTML = "";
}
