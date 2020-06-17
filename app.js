const form = document.querySelector(".form"); // форма ввода
const button = document.querySelector(".form_button"); // кнопка ok
const input = document.querySelector(".form_input"); // поле ввода
const container = document.querySelector(".container"); // контейнер для отрисовки span'ов
const timeouts = []; // массив с таймаутами
const originalTimeoutFn = window.setTimeout; // копия оригинального таймаута

form.addEventListener("submit", formApplyHandler);
button.addEventListener("click", formApplyHandler);
/**
 * Функция вешается на форму/кнопку ок. В случае выполнения
 * функция отменит пререзагрузку страницы, валидирует значение поля ввода,
 * в случае успеха валидации обнулит значение полля ввода и внутренний html контейнера,
 * далее запустится функция рендера span'ов.
 * В случае ошибки валидации запустится функция оповещания об ошибке.
 * 
 * @param {form event} event 
 */
function formApplyHandler(event) {
  event.preventDefault();
  clearTimeouts();
  let value = inputValidator(Number(input.value));
  !value && errorHandlerDisplay();
  nullifier();
  spanRenderer(value, 0);
}
/**
 * функция генерирует и возвращает случайное число от 0 до 9
 * @returns {number}
 */
function randomNumberGenerator() {
  return Math.floor(Math.random() * 10);
}
/**
 * функция принимает значение и проверяет его на: является ли число типом NaN/
 * отрицательно ли число/конечно ли число. В случае успешной проверки возвращает значение, 
 * в обратном случае возвращает false
 * @param {number} value 
 * @returns {number} value
 * @returns {boolean} false
 */
function inputValidator(value) {
  if (isFinite(value) && !isNaN(value) && value >= 0) return value;
  return false;
}
/**
 * функция обнуляет значение поля ввода и html код контейнера
 */
function nullifier() {
  input.value = "";
  container.innerHTML = "";
}
/**
 * функция создает и рендерит определнное количство span'ов в соотвествие с
 * входящим параметром. В случае если входящий параметр больше условного значения
 * (30 000), создается и рендерится 30 000 span'ов, далее вновь вызывается эта функция
 *  с новым значением и с определенным delay'эм.Новое значение уменьшается на 30 000,
 *  delay увеличивается на 1мс. Повторяется до тех пор, пока значение не будет меньше
 * 30 0000.
 * 
 * @param {number} value количество спанов для отрисовки
 * @param {delay} delay количество миллисекунд для задержки таймаута
 */
function spanRenderer(value, delay) {
  if (!value) {
    return;
  }
  delay++;
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
/**
 * функция выводит сообщение об ошибке
 */
function errorHandlerDisplay() {
  alert("Некорректный ввод");
}

/**
 *  функция имитирует  поведение стандартного таймаута, но добовляет возможность
 * занесения таймаутов в массив, который потом можно будет очистить
 * */ 
window.setTimeout = function (fn, delay) {
  const t = originalTimeoutFn(fn, delay);
  timeouts.push(t);
};
/**
 * очищяет массив таймаутов
 */
function clearTimeouts() {
  while (timeouts.length) {
    clearTimeout(timeouts.pop());
  }
}
