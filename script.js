let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector("#clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let screen = document.querySelector("#screen");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        screen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent);
        screen.textContent = currentValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = "";
        currentValue = "";
        operator = "";
        screen.textContent = "";
    })

    equal.addEventListener("click", function(){
        if(currentValue != "" && previousValue != ""){
            calculate();
            if (previousValue.length <= 9){
                screen.textContent = currentValue;
            } else {
                screen.textContent = previousValue.slice(0,9) + "...";
            }
        }
    })

    decimal.addEventListener("click", function(){
        addDecimal();
    }
    )
})

function handleNumber(num){
    if(currentValue.length <= 9 ){
        currentValue += num;
    }    
}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    } else if (operator === "-"){
        previousValue -= currentValue;
    } else if (operator ==="x"){
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }
    
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += ".";
    }
}

