// Función para añadir un valor al display
function addToDisplay(value) {
    let display = document.getElementById('display');
    let currentDisplayValue = display.value;

    // Verificar si el valor a añadir es un punto decimal
    if (value === '.') {
        // Obtener la posición del último operador
        let lastOperatorIndex = Math.max(currentDisplayValue.lastIndexOf('+'),
         currentDisplayValue.lastIndexOf('-'), currentDisplayValue.lastIndexOf('*'), 
         currentDisplayValue.lastIndexOf('/'));

        // Obtener el último número actual antes del último operador
        let lastNumber = currentDisplayValue.substring(lastOperatorIndex + 1);

        // Verificar si el último número ya contiene un punto decimal
        if (!lastNumber.includes('.')) {
            // Agregar el punto decimal solo si el último número no contiene uno
            display.value += value;
        }
    } else {
        // Si el valor a añadir no es un punto decimal, simplemente agregarlo al display
        display.value += value;
    }
}

// Función para limpiar el display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Función para borrar un carácter del display
function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Función para realizar operaciones matemáticas
function operate() {
    let input = document.getElementById('display').value;
    let numbers = input.match(/\d+\.?\d*/g);
    let operators = input.match(/[+\-*/]/g);

    // Verificar si hay un error en la entrada
    if (numbers === null || operators === null || operators.length >= numbers.length) {
        document.getElementById('display').value = 'Error';
        return;
    }

    // Inicializa el resultado con el primer número
    let result = parseFloat(numbers[0]);
    
    // Iterar sobre los operadores y números para realizar la operación
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
                // Verificar división por cero
                if (num !== 0) {
                    result /= num;
                } else {
                    document.getElementById('display').value = 'Error';
                    return;
                }
                break;
        }
    }
    
    // Redondear el resultado a 2 decimales
    result = Math.round(result * 100) / 100;
    document.getElementById('display').value = result;
}
