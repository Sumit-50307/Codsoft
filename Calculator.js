document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function handleOperator(nextOperator) {
        const value = parseFloat(displayValue);

        if (operator && waitingForSecondValue) {
            operator = nextOperator;
            return;
        }

        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = calculate(firstValue, value, operator);

            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') {
            return first + second;
        } else if (operator === '-') {
            return first - second;
        } else if (operator === '*') {
            return first * second;
        } else if (operator === '/') {
            return first / second;
        }

        return second;
    }

    function handleButtonPress(event) {
        const { value } = event.target.dataset;

        if (value === 'C') {
            displayValue = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
            updateDisplay();
            return;
        }

        if (value === '=') {
            handleOperator(value);
            operator = null;
            waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        if (waitingForSecondValue) {
            displayValue = value;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? value : displayValue + value;
        }

        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonPress);
    });
});
calc
