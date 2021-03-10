const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); // submit하며 페이지 새로 고침되는 것을 막음. 이게 디폴트값.
  const currentValue = input.value;  
  const t = document.querySelector(".js-worning");
 
  if (isNaN(currentValue)){ // currentValue값이 숫자가 아니라면 아래 함수 실행.
	  paintGreeting(currentValue);
	  saveName(currentValue);
  }else{ // 숫자면 숫자 입력하라고 뜸.
	  t.classList.add(SHOWING_CN);
	  t.innerText = `숫자가 이름이냐?`;
  }
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const t = document.querySelector(".js-worning");
  t.classList.remove(SHOWING_CN);
  greeting.innerText = `일해라, ${text} 돈의 노예 새끼야.`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();