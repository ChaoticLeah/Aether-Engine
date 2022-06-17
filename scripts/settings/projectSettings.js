import { EditorTab } from "../Tabs/editorTab.js";

export function setupProjectSettingsBindings() {
  //add a listener to the project settings
  document
    .getElementById("projectSettingsButton")
    .addEventListener("click", () => {
      //open a project settings tab
      new EditorTab(
        "Project Settings",
        "projectSettingsTab",
        true,
        undefined,
        "Project_Settings"
      );
    });
}
