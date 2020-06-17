const form = document.querySelector(".form");
const button = document.querySelector(".form_button");
const input = document.querySelector(".form_input");
const container = document.querySelector(".container");
const debouncedRender = debounce(spanRenderer, 50);
const timeout = [];
form.addEventListener("submit", formApplyHandler);
button.addEventListener("click", formApplyHandler);

function formApplyHandler(event) {
  event.preventDefault();
  clearTimeouts();
  let value = inputValidator(Number(input.value));
  !value && errorHandlerDisplay();
  nullifier();
  spanRenderer(value, 0);
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

function spanRenderer(value, delay) {
  if (!value) {
    return;
  }
  delay++;
  console.log(value);
  if (value > 30000) {
    const html = [...Array(30000)]
      .map(() => `<span class="span"> ${randomNumberGenerator()} </span>`)
      .join("");
    container.insertAdjacentHTML("beforeend", html);
    setTimeout(() => {
      spanRenderer(value - 30000);
    }, delay);
  } else {
    const html = [...Array(value)]
      .map(() => `<span class="span"> ${randomNumberGenerator()} </span>`)
      .join("");
    container.insertAdjacentHTML("beforeend", html);
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
const timeouts = [];
const originalTimeoutFn = window.setTimeout;

window.setTimeout = function (fn, delay) {
  const t = originalTimeoutFn(fn, delay);
  timeouts.push(t);
};

function clearTimeouts() {
  while (timeouts.length) {
    clearTimeout(timeouts.pop());
  }
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
