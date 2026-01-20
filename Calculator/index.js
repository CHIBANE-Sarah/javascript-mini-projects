const output = document.querySelector(".output");
const buttons = document.querySelector(".buttons");

let currentInput = "";

function updateDisplay() {
  output.textContent = currentInput || "0";
}

buttons.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const value = e.target.textContent.trim();

  if (value === "AC") {
    currentInput = "";
  } else if (value === "DE") {
    currentInput = currentInput.slice(0, -1);
  } else if (value === "=") {
    if (!currentInput || /[+\-*/.]$/.test(currentInput)) {
      updateDisplay();
      return;
    }
    try {
      const result = eval(currentInput);
      currentInput = String(result);
    } catch {
      currentInput = "Error";
    }
  } else {
    if (currentInput === "Error") currentInput = "";
    currentInput += value;
  }

  updateDisplay();
});
updateDisplay();

