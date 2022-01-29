const getDisplay = document.getElementById('display')

// Controlador para saber se a entrada no visor vai ser um novo número ou se a
// entrada vai ser a continuação do número existente.
let newDisplay = false

// Controlador para saber se a última entrada foi um número ou uma operação.
let lastActionWasANumber = true

let firstValueAndOperation = []

const operationFunctions = {
  sumNumbers: (a, b) => a + b,
  minusNumbers: (a, b) => a - b,
  timesNumbers: (a, b) => a * b,
  dividedNumbers: (a, b) => {
    if (b != 0) {
      return a / b
    } else {
      newDisplay = true
      return (getDisplay.value = 'Error') // Divisão por zero.
    }
  },
  perCent: (a, b) => (a / 100) * b,
  squareRoot: () => {
    const squareRoot = Math.sqrt(getDisplay.value)
    newDisplay = true
    lastActionWasANumber = true
    if (getDisplay.value >= 0) {
      return (getDisplay.value = squareRoot)
    } else {
      return (getDisplay.value = 'Error') // Raiz quadrada de número negativo.
    }   
  }
}

function operations(operation) {
  // Se uma operação foi chamada em sequência de outra, ela a sobreescreve.
  if (lastActionWasANumber == false) {
    firstValueAndOperation[1] = operation
    return
  }

  // Apresenta o resultado parcial de uma equação.
  if (firstValueAndOperation.length == 2) {
    buttons.btnEqual()
  }

  // Adiciona na lista o primeiro valor e a operação.
  if (getDisplay.value != '') {
    firstValueAndOperation.push(getDisplay.value)
    firstValueAndOperation.push(operation)
    newDisplay = true
    lastActionWasANumber = false
  }
}

function btnNumbers(number) {
  lastActionWasANumber = true
  if (getDisplay.value == '0') {
    getDisplay.value = ''
  }
  if (newDisplay == true) {
    getDisplay.value = ''
  }
  if (getDisplay.value.length < 14) {
    getDisplay.value += `${number}`
    newDisplay = false
  }
}

const buttons = {
  btnClear: () => {
    getDisplay.value = '0'
    firstValueAndOperation = []
  },

  btnZero: () => btnNumbers(0),
  btnOne: () => btnNumbers(1),
  btnTwo: () => btnNumbers(2),
  btnThree: () => btnNumbers(3),
  btnFour: () => btnNumbers(4),
  btnFive: () => btnNumbers(5),
  btnSix: () => btnNumbers(6),
  btnSeven: () => btnNumbers(7),
  btnEight: () => btnNumbers(8),
  btnNine: () => btnNumbers(9),

  btnDot: () => {
    lastActionWasANumber = true
    if (newDisplay == true || getDisplay.value == '') {
      getDisplay.value = '0'
    }

    if (getDisplay.value.includes('.')) {
      getDisplay.value += ''
    } else {
      getDisplay.value += '.'
    }

    newDisplay = false
  },

  btnNegative: () => (getDisplay.value = Number(getDisplay.value * -1)),

  btnSum: () => operations(operationFunctions.sumNumbers),
  btnMinus: () => operations(operationFunctions.minusNumbers),
  btnTimes: () => operations(operationFunctions.timesNumbers),
  btnDivided: () => operations(operationFunctions.dividedNumbers),
  btnPerCent: () => operations(operationFunctions.perCent),
  btnSquareRoot: operationFunctions.squareRoot,

  btnEqual: () => {
    if (firstValueAndOperation.length != 2) {
      return
    }
    let firstValue = Number(firstValueAndOperation.shift())
    let operation = firstValueAndOperation.pop()
    let secondValue = Number(getDisplay.value)

    newDisplay = true

    const result = operation(firstValue, secondValue)

    if (getDisplay.value != 'Error') {
      // toFixed para corrigir o "bug" de cálculo do JS. Ex: 0.1 + 0.2 != 0.3
      return (getDisplay.value = Number(result.toFixed(12)))
    }
  }
}
