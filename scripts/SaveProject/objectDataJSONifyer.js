import { getObject, getObjects } from "../Objects/ObjectManager.js";

export function getObjectsAsJSON() {
  let returningJSON = {};

  let objectKeys = [...getObjects().keys()];
  objectKeys.forEach((objectKey) => {
    let object = getObject(objectKey);
    console.log(object);
    let components = object.components;
    let componentsArray = [];
    for (let i = 0; i < components.length; i++) {
      componentsArray.push({
        componentName: components[i].componentName,
        parentObject: components[i].parentObject,
        properties: components[i].properties,
        objectPropertyTypes: components[i].objectPropertyTypes,
        enabled: components[i].enabled,
        componentId: components[i].componentId,
      });
    }

    returningJSON[objectKey] = {
      components: componentsArray,
      parentObjectId: object.parentObjectId,
      name: object.name,
      id: object.id,
      enabled: object.enabled,
    };
  });

  return returningJSON;
}
