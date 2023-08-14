class Calculator {
  constructor(previousInputElement, currentInputElement) {
    this.previousInputElement = previousInputElement;
    this.currentInputElement = currentInputElement;
    this.currentNumber = "";
    this.previousNumber = "";
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operation = null;
  }

  delete() {
    this.currentNumber = this.currentNumber.slice(0, -1);
  }

  appendNumber(number) {
    this.currentNumber = this.currentNumber
      ? this.currentNumber + number
      : number;
  }

  chooseOperation(operation) {
    if (this.currentNumber === "") {
      return;
    }
    if (this.previousNumber !== "") {
      calculator.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    switch (this.operation) {
      case "÷":
        result = prev / current;
        break;
      case "*":
        result = prev * current;
        break;
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      default:
        break;
    }

    this.currentNumber = result;
    this.operation = null;
    this.previousNumber = "";
  }

  updateDisplay() {
    this.currentInputElement.textContent = this.currentNumber;
    if (this.operation !== null && this.operation !== undefined) {
      this.previousInputElement.textContent = `${this.previousNumber} ${this.operation}`;
    } else {
      this.previousInputElement.textContent = "";
    }
  }
}

const number = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const allClear = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");

const currentInput = document.querySelector(".p2");
const previousInput = document.querySelector(".p1");

const calculator = new Calculator(previousInput, currentInput);

number.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operation.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
