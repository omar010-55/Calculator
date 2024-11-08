function add(a, b) {
  return +a + +b
}

function subtract(a, b) {
  return +a - +b
} 

function multiply(a, b) {
  return +a * +b
}

function divide(a, b) {
  if(+b === 0) {return "LoL"}
  return +a / +b
}

let isOperatorClicked = false

let isEqualRun = false 

let firstNumber = ""
let operator = ""
let secondNumber = ""


function reset() {
  isOperatorClicked = false
  isEqualRun = false 
  firstNumber = ""
  operator = ""
  secondNumber = ""
  refreshScreen(0)
}

function operate(numOne, op , numTwo) { //Doing operations
  if(op === "+") {
    firstNumber = add(numOne,numTwo)
  } else if(op === "-") {
    firstNumber = subtract(numOne,numTwo)
  } else if(op === "*") {
    firstNumber = multiply(numOne,numTwo)
  } else {
    firstNumber = divide(numOne,numTwo)
  }
  firstNumber = firstNumber.toString().slice(0, 9)
  isOperatorClicked = false
  operator = ""
  secondNumber = ""
  refreshScreen(firstNumber)
}
// operate(1 , "+", 2)
let screen = document.querySelector("p")
function refreshScreen(pressed) { //Refreshing the screen and
  screen.textContent = `${pressed}` 
}

let allNumbers = document.querySelector(".allNumbers") 
allNumbers.addEventListener("click", function(e) { //Sign the numbers
  if(e.target.className === "number") {
    if(isOperatorClicked === true && secondNumber.toString().length < 10) {
      secondNumber += `${e.target.id}`
      refreshScreen(secondNumber)
    } else if(firstNumber.toString().length < 10) {
      if(isEqualRun === false) {
        firstNumber += `${e.target.id}`
        refreshScreen(firstNumber)
      } else {
        firstNumber = `${e.target.id}`
        isEqualRun = false
        refreshScreen(firstNumber)
      }
      // refreshScreen(firstNumber)
    }
  } else if(e.target.className === "operate" && isOperatorClicked === false && firstNumber !== "") {
    operator += `${e.target.id}`
    isOperatorClicked = true
    isEqualRun = false
  } else if(e.target.className === "equality") {
    if(isOperatorClicked === true && secondNumber !== "") {
      operate(firstNumber, operator, secondNumber)
      isEqualRun = true
    }
  } else if(e.target.className === "reset") {
    reset()
  }
})