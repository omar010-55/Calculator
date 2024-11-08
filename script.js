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
  return +a / +b
}

let isEqualRun = false 

let firstNumber = " "
let operator = ""
let secondNumber = " "

let all = 0

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
  operator = ""
  secondNumber = " "
  refreshScreen()
}
// operate(1 , "+", 2)
let screen = document.querySelector("p")
function refreshScreen() { //Refreshing the screen and 
  screen.textContent = `${firstNumber} ${operator} ${secondNumber}` 
}

let allNumbers = document.querySelector(".allNumbers") 
allNumbers.addEventListener("click", function(e) { //Sign the numbers
  if(e.target.className === "number") {
    if(operator !== "") {
      secondNumber += `${e.target.id}`
    } else {
      firstNumber += `${e.target.id}`
    }
    refreshScreen()
  } else if(e.target.className === "operate" && operator === "") {
    operator += `${e.target.id}`
    refreshScreen()
  } else if(e.target.className === "equality") {
    operate(firstNumber, operator, secondNumber)
  }
})