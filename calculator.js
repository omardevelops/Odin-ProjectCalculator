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
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
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

const button_container = document.querySelector('#buttons-cluster');
const number_buttons = button_container.getElementsByClassName('number');
const operator_buttons = button_container.getElementsByClassName('operator');
const clear_button = button_container.querySelector('#clear');
const decimal_button = button_container.querySelector('#decimal');
const display = document.querySelector('#display');

let displayText = 0;
let operatorFlag = false; // Used to prevent invalid duplicate operators


Array.from(number_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        if (display.textContent === '0') {
            updateDisplay(button.textContent);
        } else {
            updateDisplay(display.textContent + button.textContent);
        }
        operatorFlag = false;
    });
});

Array.from(operator_buttons).forEach(function (button) {
    button.addEventListener('click', function () {
        if (!operatorFlag && displayText.length != 0) {
            displayText = displayText + button.textContent;
            operatorFlag = true;
        } else {
            if (button.id === 'subtract' && displayText.charAt(displayText.length - 1) !== '−') {
                displayText = displayText + button.textContent;
            }
        }

        console.log(displayText);
    })
})

clear_button.addEventListener('click', function () {
    display.textContent = '0';
});

decimal_button.addEventListener('click', function () {
    console.log(decimal_button.textContent);
});