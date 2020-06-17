const form = document.querySelector(".form");
const button = document.querySelector(".form_button");
const input = document.querySelector(".form_input");
const container = document.querySelector(".container");

form.addEventListener("submit", formApplyHandler);
button.addEventListener("click", formApplyHandler);

function formApplyHandler(event) {
  event.preventDefault();
  let value = inputValidator(Number(input.value));
  !value && errorHandlerDisplay();
  nullifier();
  spanRenderer(value);
}
function randomNumberGenerator() {
  return Math.floor(Math.random() * 10);
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
  let html = "";
  for (let i = 0; i < value; i++) {
    html += spanCreator();
  }
  container.innerHTML = html;
}
function spanCreator() {
  return `<span class="span">${randomNumberGenerator()}</span>`;
}
function errorHandlerDisplay() {
  alert("Некорректный ввод");
}
