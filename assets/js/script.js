const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = '';
  }

  /* Adiciona dígito para o visor da calculadora */
  addDigit(digit) {
    /* Checa se o número já tem um ponto "." */
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  /* Processa todas operações da calculadora */
  processOperation(operation) {
    /* Checa se o valor atual está vazio */
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      /* Muda operação */
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation);
      }
      return;
    }

    /* Obtém valores atual e anterior */
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(' ')[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case '+':
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '-':
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '*':
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case '/':
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case 'DEL':
        this.processDelOperator();
        break;
      case 'CE':
        this.processClearCurrentOperator();
        break;
      case 'C':
        this.processClearOperator();
        break;
      case '=':
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  /* Muda valores do visor da calculadora */
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      /* Acrescenta número ao valor atual */
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      /* Checa se valor é zero, se é, então adiciona valor atual */
      if (previous === 0) {
        operationValue = current;
      }
      /* Adiciona valor atual para anterior */
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = '';
    }
  }

  /* Muda operação matemática */
  changeOperation(operation) {
    const mathOperations = ['*', '-', '+', '/'];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  /* Remove um dígito */
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  /* Limpa operação atual */
  processClearCurrentOperator() {
    this.currentOperationText.innerText = '';
  }

  /* Limpa todas operações */
  processClearOperator() {
    this.currentOperationText.innerText = '';
    this.previousOperationText.innerText = '';
  }

  /* Processa uma operação */
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(' ')[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === '.') {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});