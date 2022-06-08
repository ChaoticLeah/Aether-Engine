export let keybinds = {
  Reset_View: 73,
};

//setter
export let setKeybind = (key, value) => {
  keybinds[key] = value;
  //Update the localStorage
  localStorage.setItem("AE_keybinds", JSON.stringify(keybinds));
};

export let getKeybind = (key) => {
  return keybinds[key];
};

export let checkLocalStorage = () => {
  if (localStorage.getItem("AE_keybinds") != null) {
    keybinds = JSON.parse(localStorage.getItem("AE_keybinds"));
  }
};
