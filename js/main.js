import Calculator from "../js/calculator.js";

const calculator = new Calculator();

// Keyboard presses
document.addEventListener("keyup", (e) => {
  const key = e.key;
  if (!isNaN(Number(key))) {
    calculator.addNumber(key);
    return;
  }

  switch(key) {
    case '+':
    case '-':
    case '*':
    case '/':
      calculator.addOperation(key);
      break;

    case 'Enter':
    case '=':
      calculator.addEquals();
      break;
    
    case '.' : 
      calculator.addPoint();
      break;
    
    case 'Backspace':
      calculator.eraseLast();
      break;
    
    case 'Delete':
      calculator.clear();
      break;
  }
});