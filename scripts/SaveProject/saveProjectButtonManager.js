import { loadProject, saveProject } from "./saveManager.js";

export function setupSaveButtonHandlers() {
  let saveButtons = Array.from(document.getElementsByClassName("saveProject"));
  let loadButtons = Array.from(document.getElementsByClassName("loadProject"));

  saveButtons.forEach((e) => {
    e.addEventListener("click", (evnt) => {
      saveProject();
    });
  });

  loadButtons.forEach((e) => {
    e.addEventListener("click", (evnt) => {
      loadProject();
    });
  });
}
