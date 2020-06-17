const form = document.querySelector(".form");
const button = document.querySelector(".form_button");
const input = document.querySelector(".form_input");
const container = document.querySelector(".container");
const debouncedRender = debounce(spanRenderer, 50);

form.addEventListener("submit", formApplyHandler);
button.addEventListener("click", formApplyHandler);

function formApplyHandler(event) {
  event.preventDefault();
  let value = inputValidator(Number(input.value));
  !value && errorHandlerDisplay();
  nullifier();
  spanRenderer(value, "");
}
function randomNumberGenerator() {
  return Math.floor(Math.random() * 10);
}
function inputValidator(value) {
  if (isFinite(value) && !isNaN(value) && value >= 0) return value;
  return false;
}
function nullifier() {
  input.value = "";
  container.innerHTML = "";
}

function spanRenderer(value) {
  if (!value) {
    return;
  }
  if (value > 20000) {
    container.innerHTML += [...Array(20000)]
      .map(() => `<span class="span"> ${randomNumberGenerator()} </span>`)
      .join("");
    setTimeout(() => {
      spanRenderer(value - 20000);
    }, 0);
  } else {
    container.innerHTML += [...Array(value)]
      .map(() => `<span class="span"> ${randomNumberGenerator()} </span>`)
      .join("");
  }
}
function errorHandlerDisplay() {
  alert("Некорректный ввод");
}
function debounce(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}

// if (!value) {
//   return;
// }
// for (let i = 0; i < 5000; i++) {
//   value--;
//   if (value < 0) break;
//   html += spanCreator();
// }
// container.innerHTML += html;
// if (value > 0) {
//   setTimeout(() => {
//     console.log(value);
//     spanRenderer(value, html);
//   }, 0);
// }
// function spanCreator() {
//   return `<span class="span">${randomNumberGenerator()}</span>`;
// }
