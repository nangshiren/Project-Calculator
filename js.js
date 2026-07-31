function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if (b === 0){
        return "Error";
    }
    return a / b;
}
function operate(a,operator,b){
    switch(operator){
        case "+":
           return add(a,b);
        case "-":
           return subtract(a,b);
        case "*":
           return multiply(a,b);
        case "/":
           return divide(a,b);
    }
} 
const operators = [7,8,9,"-",
                    4,5,6,"+",
                    1,2,3,"*",
                    0,"=","/","clear",".","delete"]
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click",handleClick);
for (let i = 0;i < operators.length;i++){
    const btn = document.createElement("button");
    btn.textContent = operators[i];
    btn.classList.add("operator");
    buttons.appendChild(btn);
}

let currentNumber = "";
let firstNumber = "";
let firstOperator = "";
const p = document.querySelector("p");
function handleClick(e){
    let k = e.target.textContent;
    if (!isNaN(k)) {
        currentNumber += k;
        p.textContent = currentNumber;
    } else if ( k ==="."){
        if (!currentNumber.includes(".")){
            if (currentNumber === "") {
            currentNumber = "0";
        }
            currentNumber += k;
            p.textContent = currentNumber;
        } 
    }
     else if ( k === "+" || k === "-" ||
                k === "*" || k === "/"
    ) {
        if (currentNumber === "." || currentNumber === ""  ){
            return;
        } else if (currentNumber !== "" && firstNumber !== "" ){
            let result = operate(Number(firstNumber),firstOperator,Number(currentNumber));
            firstNumber = Number(result.toFixed(5));
            p.textContent = firstNumber;
        } else{
            firstNumber = currentNumber;
        }
        firstOperator = k;
        currentNumber = "";
    } else if ( k === "="){
        if (currentNumber !== "" && firstNumber !== "" ){
            let result = operate(Number(firstNumber),firstOperator,Number(currentNumber));
            firstNumber = Number(result.toFixed(5));
            p.textContent = firstNumber;
            currentNumber = "";
        }
    } else if (k === "clear"){
        currentNumber = "";
        firstNumber = "";
        firstOperator = "";
        p.textContent = "";
    } else if (k === "delete") {
    currentNumber = currentNumber.slice(0, -1);
    p.textContent = currentNumber;
}
}