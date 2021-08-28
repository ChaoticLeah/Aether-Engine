function onStart(parent) {
  //We are calling our custom "add" function notice how we have to clarify
  //that it is from this class before we call the function
  parent.w = this.add(245, 100);
}

function update(parent) {}

function add(a, b) {
  return a + b;
}
