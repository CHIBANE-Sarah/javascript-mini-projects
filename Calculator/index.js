// index.js
const output = document.querySelector(".output");
const buttons = document.querySelector(".buttons");

let currentInput = "";

function updateDisplay() {
  // never show an empty screen
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
    // basic guard: avoid evaluating incomplete expressions
    if (!currentInput || /[+\-*/.]$/.test(currentInput)) {
      updateDisplay();
      return;
    }
    try {
      // evaluate; convert to string so further concatenations work
      const result = eval(currentInput);
      currentInput = String(result);
    } catch {
      currentInput = "Error";
    }
  } else {
    // append normal characters
    if (currentInput === "Error") currentInput = "";
    currentInput += value;
  }

  updateDisplay();
});

// initialize display
updateDisplay();
