 // ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a, b) => a + b;

// TODO: Write "subtract" callback expression (a, b) => ...
const substract = (a, b) => a - b;

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => a * b;

// TODO: Write "divide" callback expression (a, b) => ...
const divide = (a, b) => {
    try {
        return a / b;
    } catch (error) {
        return -1;
    }
};

// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: numA (Number), numB (Number), callback (Function)
// Checks:
//   - Is numA and numB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(numA, numB)

const calculator = (numA, numB, callback) => {
    // 1. Validar que numA y numB sean números válidos (no NaN)
    if (typeof numA !== 'number' || typeof numB !== 'number' || isNaN(numA) || isNaN(numB)) {
        return "Error: Los valores ingresados deben ser números válidos.";
    }

    // 2. Validar que callback sea realmente una función
    if (typeof callback !== 'function') {
        return "Error: Debe seleccionar una operación válida.";
    }

    // 3. Ejecutar y retornar el callback con los argumentos
    return callback(numA, numB);
};


const calculadora = (numA, numB, callback) => {
    return callback(numA, numB);
 }


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    
    try{
            // TODO: Extract values from the inputs and parse them as floats.
        const valA = parseFloat(num1Input.value);
        const valB = parseFloat(num2Input.value);

        // TODO: Retrieve the selected operation string value.
        const selectedOperation = operationSelect.value;
        if (num1Input.value === '' || num2Input.value === '') {
            throw new Error('Error: Los valores ingresados deben ser números válidos.');
        }
        if (!selectedOperation){
            throw new Error('Error: Debe seleccionar una operación válida.');
        }

        let targetCallback; 

        switch (selectedOperation) {
            case 'add':
                targetCallback = add;
                break;
            case 'subtract':
                targetCallback = substract;
                break;
            case 'multiply':
                targetCallback = multiply;
                break;
            case 'divide':
                targetCallback = divide;
                break;
            default:
                throw new Error('Error: Debe seleccionar una operación válida.');
        }

        const result = calculator(valA, valB, targetCallback);
        
        resultStatus.className = 'alert alert-success text-center';
        resultStatus.textContent = `Resultado: ${result}`;
    } catch (error) {
        resultStatus.className = 'alert alert-danger text-center';
        resultStatus.textContent = `Error: ${error.message}`;
    }

    
    // TODO: Match the selected operation string to its corresponding function reference.
    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.

});