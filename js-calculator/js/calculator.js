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
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
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


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    alert('click');
    // TODO: Extract values from the inputs and parse them as floats.
    const valA = parseFloat(num1Input.value);
    const valB = parseFloat(num2Input.value);

    // TODO: Retrieve the selected operation string value.
    const selectedOperation = operationSelect.value;

    // TODO: Match the selected operation string to its corresponding function reference.
    let chosenCallback = null;
    if (selectedOperation === 'add') chosenCallback = add;
    else if (selectedOperation === 'subtract') chosenCallback = subtract;
    else if (selectedOperation === 'multiply') chosenCallback = multiply;
    else if (selectedOperation === 'divide') chosenCallback = divide;

    // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
    resultStatus.classList.remove('alert-secondary', 'alert-danger', 'alert-success');
    const result = calculator(valA, valB, chosenCallback);
    
    // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
    if (typeof result === 'string' && (result.startsWith('Error') || result.includes('cero'))) {
        resultStatus.classList.add('alert-danger');
        resultStatus.textContent = result;
    } else {
        resultStatus.classList.add('alert-success');
        resultStatus.textContent = `Resultado: ${result}`;
    }

});