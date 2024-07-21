function sayHi(name) {
  console.log("Hello," + name);
}

sayHi("Taha");

function addNumbers(a, b) {
  return a + b;
}

console.log(addNumbers(1, 2));

// Calculator
let displayValue = "";

function appendToDisplay(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = displayValue;
}

function calculate() {
  try {
    let result = eval(displayValue);
    document.getElementById("display").value = result;
    displayValue = "";
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}
