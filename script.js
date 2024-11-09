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
  if(+b === 0) {return "LoL"}  //Divide by 0 safety
  return +a / +b
}

let isOperatorClicked = false

let isEqualRun = false 

let firstNumber = ""
let operator = ""
let secondNumber = ""


function reset() {  //Reset all operations and variables
  isOperatorClicked = false
  isEqualRun = false 
  firstNumber = ""
  operator = ""
  secondNumber = ""
  refreshScreen(0)
}

function operate(numOne, op , numTwo) {  //Doing operations based on op content
  if(op === "+") {
    firstNumber = add(numOne,numTwo)
  } else if(op === "-") {
    firstNumber = subtract(numOne,numTwo)
  } else if(op === "*") {
    firstNumber = multiply(numOne,numTwo)
  } else {
    firstNumber = divide(numOne,numTwo)
  }
  firstNumber = firstNumber.toString().slice(0, 9)  //Limit to 9 numbers
  isOperatorClicked = false
  operator = ""
  secondNumber = ""
  refreshScreen(firstNumber)
}
let screen = document.querySelector("p")
function refreshScreen(pressed) {  //Refreshing the screen
  screen.textContent = `${pressed}` 
}

let allNumbers = document.querySelector(".allNumbers") 
allNumbers.addEventListener("click", function(e) { //Sign the numbers an all clicked buttons with checking the class and applying id
  if(e.target.className === "number") {
    if(isOperatorClicked === true && secondNumber.toString().length < 9) {  //To sign the second number based on condition
      if(e.target.id === ".") {  //For the Dot logic its here to obey the previous roles of if
        if(!secondNumber.split("").includes(".")) {  //To not applying two dots ..
          secondNumber += `${e.target.id}`
          return refreshScreen(secondNumber)
        } else return //End and don't sign it 
      }
      secondNumber += `${e.target.id}` //If it's normal number not the dot "." then do the normal actions
      refreshScreen(secondNumber)
    } else if(firstNumber.toString().length < 9) {  //Limit to 9
      if(isEqualRun === false) {  //If equal not clicked act normal
        if(e.target.id === ".") {
          if(!firstNumber.split("").includes(".")) {
            firstNumber += `${e.target.id}`
            return refreshScreen(firstNumber)
          } else return
        }
        firstNumber += `${e.target.id}`
        refreshScreen(firstNumber)
      } else {  //If equal clicked reset firstNumber value after clicking numbers or dot again
        firstNumber = `${e.target.id}`
        isEqualRun = false  //Reset this logic
        refreshScreen(firstNumber)
      }
    }
  } else if(e.target.className === "operate" && isOperatorClicked === false && firstNumber !== "") {  //First time to click operate
    operator += `${e.target.id}`
    isOperatorClicked = true
    isEqualRun = false
  } else if(e.target.className === "equality") {
    if(isOperatorClicked === true && secondNumber !== "") {  //To not have Errors
      operate(firstNumber, operator, secondNumber)
      isEqualRun = true
    }
  } else if(e.target.className === "reset") {
    reset()
  }
})