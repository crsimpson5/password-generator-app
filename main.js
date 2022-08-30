const lengthRange = document.getElementById("length-range");
const lengthDisplay = document.querySelector(".length-display");
const range = document.querySelector(".range");
const strength = document.querySelector(".strength");
const scale = document.querySelector(".scale");

function setStrength(val) {
  let text = "";

  switch (val) {
    case 1:
      text = "Too weak!";
      break;
    case 2:
      text = "Weak";
      break;
    case 3:
      text = "Medium";
      break;
    case 4:
      text = "Strong";
      break;
    default:
      return;
  }

  strength.textContent = text;
  scale.dataset.value = val;
}

function evalStrength() {
  const length = parseInt(lengthRange.value);
  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  if (!(useUppercase || useLowercase || useNumbers || useSymbols)) {
    return 1;
  }

  let strength = (length / 10) * 2;
  useUppercase && (strength *= 1.2);
  useLowercase && (strength *= 1.2);
  useNumbers && (strength *= 1.1);
  useSymbols && (strength *= 1.3);

  strength = parseInt(strength);

  if (strength < 1) {
    return 1;
  } else if (strength > 4) {
    return 4;
  }
  return strength;
}

const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("input", () => setStrength(evalStrength()));
});

lengthRange.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  const min = parseInt(e.target.min);
  const max = parseInt(e.target.max);

  lengthDisplay.textContent = value;

  const width = ((value - min) / (max - min)) * 100 + "%";
  range.style.setProperty("--width", width);

  setStrength(evalStrength());
});

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", (e) => {
  e.target.classList.add("active");

  if (navigator.clipboard) {
    const text = output.textContent;
    navigator.clipboard.writeText(text);
  }
});

// Generate password

const generateBtn = document.querySelector(".generate-btn");
const output = document.querySelector(".output");

function generatePassword() {
  const length = parseInt(lengthRange.value);
  let chars = [];
  let password = "";

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
  const numbers = "0123456789".split("");
  const symbols = "`~!@#$%^&*()-_=+[{]};:'\",.?/".split("");

  const useUppercase = document.getElementById("uppercase").checked;
  const useLowercase = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  useUppercase && (chars = [...chars, ...uppercase]);
  useLowercase && (chars = [...chars, ...lowercase]);
  useNumbers && (chars = [...chars, ...numbers]);
  useSymbols && (chars = [...chars, ...symbols]);

  if (chars.length > 0) {
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return password;
}

function setPassword() {
  output.value = generatePassword();
  copyBtn.classList.remove("active");
}

generateBtn.addEventListener("click", setPassword);

// Initialize app

function init() {
  lengthDisplay.textContent = lengthRange.value;
  setStrength(evalStrength());
}
init();
