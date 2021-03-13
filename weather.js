const weather = document.querySelector(".js-weather");
const API_KEY = "06a93d24f03b0c1f45cbc2871b1c008a";
const COORDS = "coords";

function getWeather(lat, lon) {
  //then()는 데이터가 완전히 들어온 다음에 함수를 호출하도록 해줌.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric` //units=metric는 도씨로 바꿔서 불러옴. 기본값이 켈빈값인 듯.
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
       const place = json.name;
       const temperature = json.main.temp;
       const cur_weather = json.weather.main;
       const humidity = json.main.humidity;
      
      weather.innerText = `${place}, ${cur_weather}, ${temperature}℃, {humidity}%`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location!");
}

function askForCoords() {
  // 위도와 경도를 읽어와라. 위치 가져오는데 성공하면 succes로, 실패하면 error를 실행해라.
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
