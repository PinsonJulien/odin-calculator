export default class Calculator {
  // Const
  topDisplay = document.getElementById("top-display");
  bottomDisplay = document.getElementById("bottom-display");
  numPad = document.getElementById("num-pad");
  operationPad = document.getElementById("operation-pad")

  // vars
  firstNumber = 0;
  secondNumber = 0;
  ongoingOperation = '';

  constructor () {
    const operations = [
      '+', 
      '-', 
      '*', 
      '/'
    ];

    // Generate operations buttons
    operations.forEach((operation) => {
      const btn = document.createElement("button");
      btn.textContent = operation;

      btn.addEventListener("click", () => this.addOperation(btn.textContent));

      this.operationPad.append(btn);
    });

    const equal = document.createElement("button");
    equal.textContent = '=';
    equal.addEventListener("click", () => this.addEquals());
    this.operationPad.append(equal);

    // Generate numpad buttons
    for (let i = 9; i >= 0; --i) {
      const btn = document.createElement("button");
      btn.textContent = i;

      btn.addEventListener("click", () => this.addNumber(btn.textContent));
      
      this.numPad.append(btn);
    }

    const point = document.createElement("button");
    point.textContent = '.';
    point.addEventListener("click", () => this.addPoint());

    this.numPad.append(point);
  }

  setFirstNumber(number) {
    this.firstNumber = Number(number);
  }

  setSecondNumber(number) {
    this.secondNumber = Number(number);
  }

  setOngoingOperation(operation) {
    this.ongoingOperation = operation;
  }

  addNumber(numberString) {
    this.bottomDisplay.textContent += numberString;
  }

  addPoint() {
    if (this.bottomDisplay.textContent.includes('.')) return;
    this.bottomDisplay.textContent += '.';
  }

  addOperation(operation) {
    if (this.ongoingOperation) this.calculate();

    this.setFirstNumber(this.bottomDisplay.textContent);
    this.ongoingOperation = operation;
    this.topDisplay.textContent = `${this.firstNumber} ${this.ongoingOperation}`;
    this.bottomDisplay.textContent = '';
  }

  addEquals() {
    this.calculate();
  }

  calculate() {
    if (this.ongoingOperation === null) return;
    this.setSecondNumber(this.bottomDisplay.textContent);

    if (this.ongoingOperation === '/' && this.secondNumber === 0) {
      alert("Cannot divide by 0.");
      return;
    }

    const total = (() => {
      const a = this.firstNumber;
      const b = this.secondNumber;

      switch(this.ongoingOperation) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '/':
          return a / b;
        case '*':
          return a * b;
      }
    })();

    this.topDisplay.textContent = `${this.firstNumber} ${this.ongoingOperation} ${this.secondNumber} =`;
    this.bottomDisplay.textContent = 
      (total % 1 === 0) 
      ? total 
      : total.toFixed(4);
    
    // reset
    this.ongoingOperation = null;
  }
}