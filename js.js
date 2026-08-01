const operators = [7,8,9,"+",
                   4,5,6,"-",
                   1,2,3,"*",
                   "/",".","delete","=",
                   "clear"   
                ]
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

for (let i = 0;i < operators.length;i++){
    const btn = document.createElement("button");
    btn.textContent = operators[i];
    if(!isNaN(btn.textContent)){
        btn.classList.add("number");
    } else {
        btn.classList.add("operator");
    }
    buttons.appendChild(btn);
}
console.log("初始化 current");
buttons.addEventListener("click",e=>{
    let k = e.target.textContent;
    handleInput(k);
});
const f = document.querySelector(".formula");
const c = document.querySelector(".currentNumber");
let current = "";
let firstNumber = "";
let firstOperator = "";
let expression = "";

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
function operate(a, operator, b){
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            return "Error";
            current = "";
            firstNumber = "";
            firstOperator = "";
            expression = "";
            c.textContent = "Error";
            f.textContent = "";
    }
}
document.addEventListener("keydown",e=>{
    let k = e.key;
    console.log(k);
    if (k === "Backspace"){
        k = "delete";
    } else if (k ==="Escape"){
        k = "clear";
    } else if (k ==="")
    handleInput(k);    
});
function handleInput(k){
    console.log(k);
    if (!isNaN(k)){
        if (firstNumber !=="" && firstOperator ===""){
            firstNumber = "";
            current ="";
            current += k;
            c.textContent = current;
        } else {current += k;
        c.textContent = current;}
    } else if(k ==="."){
        if (current ===""){
            current = "0.";
            c.textContent = current;
        } else if (current !== ""){
            current += k;
            c.textContent = current;
        }
    } 
    else if(k === "+" ||
              k === "-" ||
              k === "*" ||
              k === "/" 
    ) {
        if (firstNumber === "" & current !==""){
            firstNumber = current;
            firstOperator = k;
            f.textContent = firstNumber + k;
            current = "";
        } else if (firstNumber !== "" && current !== ""){
            firstNumber = operate(Number(firstNumber),firstOperator,Number(current));
            firstOperator = k;
            f.textContent = firstNumber + k;
            current = "";
        } else if (firstNumber !== "" && current === "") {
            firstOperator = k;
            f.textContent = firstNumber + k;
        }
    } else if(k==="="){
        if(firstNumber !== "" && current !== ""){
            firstNumber = operate(Number(firstNumber),firstOperator,Number(current));
            f.textContent = firstNumber;
            firstOperator = "";
            current = "";
        } else {
            return;
        }
    } else if (k === "delete"){
        if(current !== ""){
            current = current.slice(0,-1);
            c.textContent = current;
        }
    } else if (k === "clear"){
        current = "";
        firstNumber = "";
        firstOperator = "";
        expression = "";
        c.textContent = "";
        f.textContent = "";
    }
}