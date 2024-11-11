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

let isOperatorClicked = false

let isEqualRun = false 

let firstNumber = ""

let operator = ""

let secondNumber = ""

let isSecondNumberClicked = false

  // Reset All Values //
function reset() {  //Reset all operations and variables
  isOperatorClicked = false
  isEqualRun = false 
  isSecondNumberClicked = false
  firstNumber = ""
  operator = ""
  secondNumber = ""
  refreshScreen(0)
}

  // The main Operation Func //
function operate(numOne, op , numTwo) {  //Doing operations based on op content
  if(op === "+") {
    firstNumber = add(numOne,numTwo)
  } else if(op === "-") {
    firstNumber = Math.round(subtract(numOne,numTwo)*100000000) / 100000000
  } else if(op === "*") {
    firstNumber = Math.round(multiply(numOne,numTwo)*10000) / 10000
  } else {
    firstNumber = Math.round(divide(numOne,numTwo)*100000000) / 100000000
    if(+numTwo === 0) {  //Divide by 0 safety
      firstNumber = "Zero LOL!"
      refreshScreen(firstNumber)
      isOperatorClicked = false
      isEqualRun = false 
      isSecondNumberClicked = false
      firstNumber = ""
      operator = ""
      secondNumber = ""
      return
    } else {
      firstNumber = Math.round(divide(numOne,numTwo)*100000000) / 100000000
    }
  }
  firstNumber = firstNumber.toString().slice(0, 9)  //Limit to 9 numbers
  isOperatorClicked = false
  operator = ""
  secondNumber = ""
  refreshScreen(firstNumber)
}

  // To Refresh The Screen //
let screen = document.querySelector("p")
function refreshScreen(pressed) {  //Refreshing the screen
  screen.textContent = `${pressed}` 
}

  // All Buttons in One Event Listener //
let allNumbers = document.querySelector(".allNumbers")
allNumbers.addEventListener("click", function(e) {  //Sign the numbers an all clicked buttons with checking the class and applying id
  if(e.target.className === "number") {
    if(isOperatorClicked === true && secondNumber.toString().length < 9) {  //To sign the second number based on condition
      if(e.target.id === ".") {  //For the Dot logic its here to obey the previous roles of if
        if(!secondNumber.split("").includes(".")) {  //To not applying two dots ..
          isSecondNumberClicked = true
          secondNumber += `${e.target.id}`
          return refreshScreen(secondNumber)
        } else return  //End and don't sign it
      }
      isSecondNumberClicked = true
      secondNumber += `${e.target.id}`  //If it's normal number not the dot "." then do the normal actions
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
        // isSecondNumberClicked = false
        firstNumber = `${e.target.id}`
        isEqualRun = false  //Reset this logic
        refreshScreen(firstNumber)
      }
    }
  } else if(e.target.className === "operate" && firstNumber !== "") {  //First time to click operate
    if(isOperatorClicked === true && secondNumber !== "") {
      isSecondNumberClicked = false //To delete the first number which will be the last add or returned
      operate(firstNumber, operator, secondNumber)
    }
    operator += `${e.target.id}`
    isOperatorClicked = true
    isEqualRun = false
  } else if(e.target.className === "equality") {
    if(isOperatorClicked === true && secondNumber !== "") {  //To not have Errors
      isSecondNumberClicked = false //To delete the first number which will be the last add or returned
      operate(firstNumber, operator, secondNumber)
      isEqualRun = true
    }
  } else if(e.target.className === "reset") {
    reset()
  } else if(e.target.className === "del") {
    del()
  }
})

  // Delete Func //
function del() {  //Delete button logic
  if(isSecondNumberClicked === true) {
    secondNumber = secondNumber.toString().slice(0,-1)
    return refreshScreen(secondNumber)
  } else {
    firstNumber = firstNumber.toString().slice(0, -1)
    return refreshScreen(firstNumber)
  }
}

  // Keyboard Support //
const listOfNumbers = ["0","1","2","3","4","5","6","7","8","9","."]
const listOfOperatores = ["+","-","*","/"]
window.addEventListener("keydown", (e) => {
  if(listOfNumbers.includes(e.key)) {
    if(isOperatorClicked === true && secondNumber.toString().length < 9) {  //To sign the second number based on condition
      if(e.key === ".") {  //For the Dot logic its here to obey the previous roles of if
        if(!secondNumber.split("").includes(".")) {  //To not applying two dots ..
          isSecondNumberClicked = true
          secondNumber += `${e.key}`
          return refreshScreen(secondNumber)
        } else return  //End and don't sign it
      }
      isSecondNumberClicked = true
      secondNumber += `${e.key}`  //If it's normal number not the dot "." then do the normal actions
      refreshScreen(secondNumber)
    } else if(firstNumber.toString().length < 9) {  //Limit to 9
      if(isEqualRun === false) {  //If equal not clicked act normal
        if(e.key === ".") {
          if(!firstNumber.split("").includes(".")) {
            firstNumber += `${e.key}`
            return refreshScreen(firstNumber)
          } else return
        }
        firstNumber += `${e.key}`
        refreshScreen(firstNumber)
      } else {  //If equal clicked reset firstNumber value after clicking numbers or dot again
        // isSecondNumberClicked = false
        firstNumber = `${e.key}`
        isEqualRun = false  //Reset this logic
        refreshScreen(firstNumber)
      }
    }
  } else if(listOfOperatores.includes(e.key) && firstNumber !== "") {  //First time to click operate
    if(isOperatorClicked === true && secondNumber !== "") {
      isSecondNumberClicked = false //To delete the first number which will be the last add or returned
      operate(firstNumber, operator, secondNumber)
    }
    operator += `${e.key}`
    isOperatorClicked = true
    isEqualRun = false
  } else if(e.key === "Enter" || e.key === "=") {
    if(isOperatorClicked === true && secondNumber !== "") {  //To not have Errors
      isSecondNumberClicked = false //To delete the first number which will be the last add or returned
      operate(firstNumber, operator, secondNumber)
      isEqualRun = true
    }
  } else if(e.key === "c" || e.key === "Escape") {
    reset()
  } else if(e.key === "Backspace") {
    del()
  }
})