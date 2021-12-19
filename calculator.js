const button_container = document.querySelector('#buttons-cluster');
const number_buttons = button_container.getElementsByClassName('number');
const operator_buttons = button_container.getElementsByClassName('operator');
const clear_button = button_container.querySelector('#clear');
const decimal_button = button_container.querySelector('#decimal');
const equal_button = button_container.querySelector('#equal');
const display = document.querySelector('#display');

let displayText = 0;
let maxDigits = 14;
let heldNumber, newNumber = '', operator;
let operatorFlag = false; // True means clicked on operator

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y == 0) return 'ERROR';
    return x / y;
}

function operate(operator, num1, num2) {
    if (operator === 'add') {
        return add(num1, num2);
    } else if (operator === 'subtract') {
        return subtract(num1, num2);
    } else if (operator === 'multiply') {
        return multiply(num1, num2);
    } else if (operator === 'divide') {
        return divide(num1, num2);
    } else {
        return 'I AM ERROR.';
    }
}

function isOperatorIncluded(text) {
    return displayText.includes('+') || displayText.includes('-') || displayText.includes('×') || displayText.includes('÷');
}

function updateDisplay(text) {
    display.textContent = text;
}

function clearDisplay() {
    display.textContent = '0';
    newNumber = '';
    heldNumber = '';
    operatorFlag = false;
    Array.from(operator_buttons).forEach(function (button) {
        button.classList.remove('operator-pressed');
    });
}

function displayError(error) {
    updateDisplay(error);
    buttonFunctionality(true);
    setTimeout(() => {
        clearDisplay();
        buttonFunctionality(false);
    }, 1000);
}

function calculateResult(operator, num1, num2) {
    console.group([operator, num1, num2]);
    let result = operate(operator, num1, num2);
    if (result == 'ERROR') {
        displayError('MATH ERROR');
    } else {
        if (Number.isInteger(result) == false)
        result = Math.round((result + Number.EPSILON) * 100000000000) / 100000000000; // Limit decimal places

        if ((result + "").length >= maxDigits) {
            displayError('OVERFLOW ERROR');
        } else {
            updateDisplay(result);
        }
    }

    Array.from(operator_buttons).forEach(function (button) {
        button.classList.remove('operator-pressed');
    });
}

function buttonFunctionality(enabled) {
    const buttons = Array.from(button_container.querySelector('button'));
    buttons.forEach(button => button.disabled = enabled);
}

Array.from(number_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        if (display.textContent.length >= maxDigits) {
            displayError('OVERFLOW ERROR');
        } else {
            if (operatorFlag === false) {
                if (display.textContent === '0') {
                    updateDisplay(button.textContent);
                } else {
                    updateDisplay(display.textContent + button.textContent);
                }
            } else {
                newNumber += button.textContent;
                updateDisplay(newNumber);
            }
        }
    });
});

// Operator buttons event listeners
Array.from(operator_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        operatorFlag = true;
        let previousOperator = operator;
        operator = button.id;

        // Calculate new result if new number is set
        if (newNumber !== '') {
            calculateResult(previousOperator, parseFloat(heldNumber), parseFloat(newNumber));
            newNumber = '';
        }

        button.classList.add('operator-pressed'); // Highlight this button by adding this class
        // Remove highlight from other operators
        Array.from(operator_buttons).forEach(function (btn) {
            if (btn.id != button.id) btn.classList.remove('operator-pressed');
            console.log(btn);
        });

        heldNumber = display.textContent; // save previous number
    })
});

// Equal button event listener
equal_button.addEventListener('click', function () {
    if (operatorFlag === true) {
        calculateResult(operator, parseFloat(heldNumber), parseFloat(newNumber));
        newNumber = '';
        operatorFlag = false;
    }
})

clear_button.addEventListener('click', clearDisplay);

// decimal_button.addEventListener('click', function () {
//     console.log(decimal_button.textContent);
// });