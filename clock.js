const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    
    clockTitle.innerText = `${ hours < 10 ? `0${hours}` : hours } : ${ minutes < 10 ? `0${minutes}` : minutes } : ${seconds < 10 ? `0${seconds}` : seconds }`; 
}
function init() {
    console.log(document.getElementById("form"))
    getTime(); // 먼저 실행 안시켜주면 00:00이 먼저 뜨고 시간, 분, 초가 움직임.
    setInterval(getTime,1000);
}

init();