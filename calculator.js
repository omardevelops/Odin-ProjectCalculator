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

function calculateResult(operator, num1, num2) {
    console.group([operator, num1, num2]);
    updateDisplay(operate(operator, num1, num2));
    Array.from(operator_buttons).forEach(function (button) {
        button.classList.remove('operator-pressed');
    });
    // operatorFlag = false;
}

const button_container = document.querySelector('#buttons-cluster');
const number_buttons = button_container.getElementsByClassName('number');
const operator_buttons = button_container.getElementsByClassName('operator');
const clear_button = button_container.querySelector('#clear');
const decimal_button = button_container.querySelector('#decimal');
const equal_button = button_container.querySelector('#equal');
const display = document.querySelector('#display');

let displayText = 0;
let heldNumber, newNumber = '', operator;
let operatorFlag = false; // True means clicked on operator


Array.from(number_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        if (operatorFlag === false) {
            if (display.textContent === '0') {
                updateDisplay(button.textContent);
            } else {
                updateDisplay(display.textContent + button.textContent);
            }
        } else {
            newNumber += button.textContent;
            updateDisplay(newNumber);
            // operate(operator, heldNumber, newNumber)
        }

    });
});

Array.from(operator_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        console.log('hello');
        operatorFlag = true;
        operator = button.id;

        button.classList.add('operator-pressed');
        console.log(button);
        Array.from(operator_buttons).forEach(function (btn) {
            if (btn.id != button.id) btn.classList.remove('operator-pressed');
            console.log(btn);
        });

        heldNumber = display.textContent; // save previous number
    })
});

equal_button.addEventListener('click', function () {
    if (operatorFlag === true) {
        calculateResult(operator, parseFloat(heldNumber), parseFloat(newNumber));
        newNumber = '';
        operatorFlag = false;
    }
})

clear_button.addEventListener('click', function () {
    display.textContent = '0';
    newNumber = '';
    heldNumber = '';
    operatorFlag = false;
    Array.from(operator_buttons).forEach(function (button) {
        button.classList.remove('operator-pressed');
    });
});

// decimal_button.addEventListener('click', function () {
//     console.log(decimal_button.textContent);
// });