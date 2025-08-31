const output = document.querySelector(".output");
const buttons = document.querySelectorAll(".button button");

let currentInput = "";

buttons.forEach(button =>{
    button.addEventListener("click", function(){
        const buttonText = button.textContent;

        if(buttonText === "AC"){
            currentInput = "";
        } else if(buttonText === "DE"){
            currentInput = currentInput.slice(0, -1);
        } else if( buttonText === "="){
            try{
                currentInput = eval(currentInput);
            } catch(error){
                currentInput = "Error";
            }
        } else{
            currentInput += buttonText;
        }

        output.textContent = currentInput;
    })
})