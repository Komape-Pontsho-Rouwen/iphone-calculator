

const buttons = document.querySelectorAll('.btn'); //All calculator buttons
const display = document.getElementById('display'); // To control what's shown on the screen

let currentInput = '0';
let previousInput =''; //Starts as an empty string because nothing has been typed yet also doesn't show on the screen
let operator = '';
let shouldResetScreen= false; // If display should be cleared before typing a new number

//Event Listeners 
buttons.forEach(button=>{ //Looping through all buttons
    button.addEventListener('click',()=>{ //watch each button for clicks
        const btnText = button.textContent;

        //Deciding what to do with the button clicked

        if(button.classList.contains('number')){
            handleNumber(btnText); //Handle the number clicked using this method
        }
        else if(button.classList.contains('operator')){
            handleOperator(btnText);

        }
        else if(button.classList.contains('function')){
            handleFunction(btnText);

        }
        updateDisplay()
            
    });
});


function updateDisplay() {
    display.textContent = currentInput;
}

//Function to handle different button types 

function handleNumber(num){
    if(num===',' && currentInput.includes(',')) 
        return; //Prevents multiple commas


    if(shouldResetScreen){
        if(num===','){
            currentInput= '0,'; //Start the decimal with 0
        }else{
            currentInput = num; //Start with the number pressed
        }
        shouldResetScreen = false;// Next number will add to current input

    }
    else{
        if(currentInput === '0' && num !==','){
            currentInput = num; //Replace 0 with the new number
    }else{
        currentInput = currentInput + num; //Append the new number
    }
}
updateDisplay();
}
//Function to handle operator buttons

function handleOperator(op){
    if(op === '='){
        calculate();
        operator=''; //after calculation reset operator
        shouldResetScreen= true;
    }else{
        if(previousInput !=='' && operator !==''){ //If we have an input and operator we calculate first before moving forward even without '='
            calculate();
            shouldResetScreen=false;
        }
        operator = op;
        previousInput = currentInput;
        shouldResetScreen = true; //The last number that the user clicked should not combine like a single number with the new1
    }
}

//function to handle functions

function handleFunction(func){
    switch(func){ //We using switch statements to check which special button was clicked
        case 'AC': //Clear everything 
            currentInput = '0';
            previousInput ='';
            operator='';
            break;
            case '+/-': //Changing a sign 
                currentInput= (parseFloat(currentInput) * -1).toString();
                break;
                case '%':
                    currentInput = (parseFloat(currentInput/100)).toString(); //Converting the string to a number for calculations
                    break;
    }
    updateDisplay();
}

//Creating the calculate function

function calculate(){
    //Converting all stored values to numbers.
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    //We checking if any of these are not numbers
    if(isNaN(prev) || isNaN(current)) return;
    let result;

switch(operator){
    case '+':
        result = prev + current;
        break;
        case '-':
            result = prev - current;
            break;
            case '×':
                result = prev*current;
                break;
                case '÷':
                    result = prev/current;
                    break;
                default:
                    return;
}


currentInput = result.toString();
operator ='';
previousInput ='';
}







