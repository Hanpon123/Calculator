class Calculator {
    constructor() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }

    inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = this;

        if (waitingForSecondOperand === true) {
            this.displayValue = digit;
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    inputDecimal(dot) {
        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
        }
    }

    handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = this;
        const inputValue = parseFloat(displayValue);

        if (operator && this.waitingForSecondOperand) {
            this.operator = nextOperator;
            return;
        }

        if (firstOperand == null) {
            this.firstOperand = inputValue;
        } else if (operator) {
            const result = this.performCalculation[operator](firstOperand, inputValue);

            this.displayValue = String(result);
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    }

    performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand
    };

    resetCalculator() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }
}

const calculator = new Calculator();

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            calculator.handleOperator(value);
            break;
        case '.':
            calculator.inputDecimal(value);
            break;
        case 'all-clear':
            calculator.resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                calculator.inputDigit(value);
            }
    }

    updateDisplay();
});
