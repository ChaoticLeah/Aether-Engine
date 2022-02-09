import { getObject, getObjects } from "../Objects/ObjectManager.js";

export function getObjectsAsJSON() {
  let returningJSON = {};

  let objectKeys = [...getObjects().keys()];
  objectKeys.forEach((objectKey) => {
    let object = getObject(objectKey);
    let components = object.components;
    let componentsArray = [];
    for (let i = 0; i < components.length; i++) {
      componentsArray.push({
        componentName: components[i].componentName,
        properties: components[i].properties,
      });
    }

    returningJSON[objectKey] = {
      components: componentsArray,
    };
  });

  return returningJSON;
}
