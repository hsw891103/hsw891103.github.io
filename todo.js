const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";
let toDos = [];

const countTitle = document.querySelector(".point");
let counts = 0;
let diff1 = 0;
let result = 0;
let idCounts = 0;

function handleChange() {
  saveToDos();
  countToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const li_check = li.querySelector("span");
  if (li_check.className === "null check") {
    counts -= 1; // 체크된거 삭제 하면 체크된 총점수 값이 달라짐.
  }
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    // filter는 기존 list에 있는 내용 중 조건에 맞는 값만 가지고 새로운 리스트를 만들어줌.
    return toDo.id !== parseInt(li.id); // toDo.id는 숫자, li.id는 string. 그래서 parseInt로 형변환.
  });
  toDos = cleanToDos;
  handleChange();
}

function checkToDo(event) {
  const chT = event.target;
  const li = chT.parentNode;
  const li_id = li.id;
  const span = li.querySelector("span");

  toDos.map(function (item) {
    if (item.id === parseInt(li_id)) {
      const isCheked = item.check;
      if (isCheked) {
        item.check = 0;
        span.classList.remove("check");
        counts--;
      } else {
        item.check = 1;
        span.classList.add("check");
        counts++;
      }
      handleChange();
    }
  });
}

function countToDos() {
  // 점수 계산이 안됨. 왜 여러번 들어오는걸까?
  diff1 = 10 / toDos.length;
  result = counts * diff1;
  countTitle.innerText = `${
    isNaN(result) || result == Infinity ? `0` : result.toFixed(1)
  } / 10.0`;
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //localStorage는 obj형태로 저장함. json.strinify는 obj->string으로 저장할 수 있도록 해줌.
}

function paintToDo(text, check) {
  const li = document.createElement("li");
  const toDo = document.createElement("span");
  const newId = idCounts + 1;
  const delBtn = document.createElement("button");

  delBtn.innerText = "🗑";
  delBtn.addEventListener("click", deleteToDo);

  toDo.className = check ? "check" : null;
  toDo.innerText = text;
  toDo.addEventListener("click", checkToDo);

  li.appendChild(toDo);
  li.id = newId;
  li.appendChild(delBtn);

  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
    check: check ? 1 : 0, // localstorage에 0 또는 1이 저장됨
  };
  idCounts++;
  toDos.push(toDoObj);
  handleChange();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //localStorage에 string으로 저장된걸 JS에서 다루기 위해 다시 obj로 변환시킴
    parsedToDos.forEach(function (toDo) {
      const text = toDo.text;
      const check = toDo.check;
      paintToDo(text, check);
      if (check) {
        // check 값은 0 또는 1임. 0은 false, 1은 true임. 그래서 check값이 1일 때 counts에 1이 더해짐.
        counts++;
      }
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
