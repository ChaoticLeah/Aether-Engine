function onStart(parent) {
  //We are calling our custom "add" function notice how we have to clarify
  //that it is from this class before we call the function
  //We are also setting the width to that new value
  parent.setW(this.add(9, 10));
}

function update(parent) {}

function add(a, b) {
  return a + b;
}
