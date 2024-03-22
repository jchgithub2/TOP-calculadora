function addToDisplay(value) {
    document.getElementById('display').value += value;
}
function clearDisplay() {
    document.getElementById('display').value = '';
}
function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
function operate() {
    let input = document.getElementById('display').value;
    let numbers = input.match(/\d+\.?\d*/g);
    let operators = input.match(/[+\-*/]/g);

    if (numbers === null || operators === null || operators.length >= numbers.length) {
        document.getElementById('display').value = 'Error';
        return;
    }

    let result = parseFloat(numbers[0]);
    for (let i = 0; i < operators.length; i++) {
        let num = parseFloat(numbers[i + 1]);
        switch (operators[i]) {
            case '+':
                result += num;
                break;
            case '-':
                result -= num;
                break;
            case '*':
                result *= num;
                break;
            case '/':
                if (num !== 0) {
                    result /= num;
                } else {
                    document.getElementById('display').value = 'Error';
                    return;
                }
                break;
        }
    }
     //redondear a 2 decimales.
     result = Math.round(result * 100) / 100;
    document.getElementById('display').value = result;
}