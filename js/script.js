/* ----Вывод времени---- */

const time = document.querySelector('.time');
const dateIns = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime
  showDate();
  setTimeout(showTime, 1000);
};

showTime();

/* ----Вывод даты---- */

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-EN', options);
  dateIns.textContent = currentDate;
};

showDate();

/* ----Приветствие--- */

const greetingsSpan = document.querySelector('.greeting');
const name = document.querySelector('.name');

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay =
      (hours <= 6) ? "night"
        : (hours <= 11) ? "morning"
          : (hours <= 18) ? 'afternoon'
            : (hours <= 24) ? "evening"
              : "unknown";
    const greetingText = `Good ${timeOfDay},`;
    greetingsSpan.textContent = greetingText;
};

showGreeting();

/* ----Запись имени---- */

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)



/* ---- Слайдер изображений ---- */

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

var randomNum = Math.floor(Math.random() * 21);
if (randomNum === 0) {
  randomNum = 1;
};
var randomNumZero = String(randomNum).padStart(2, 0);
const date = new Date();
const hours = date.getHours();
let timeOfDay = 
      (hours <= 6) ? "night"
        : (hours <= 11) ? "morning"
          : (hours <= 18) ? 'afternoon'
            : (hours <= 24) ? "evening"
              : "unknown";

body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumZero}.jpg)`;

function changeBg() {
  var img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumZero}.jpg`
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  }; 
};

console.log(randomNum);

function nextSlide() {
  (randomNumZero < 20) ? randomNumZero ++ : randomNumZero = 1;
  randomNumZero = String(randomNumZero).padStart(2, 0);
  console.log(randomNumZero);
  changeBg();
}

function prevSlide() {
  (randomNumZero > 1) ? randomNumZero -- : randomNumZero =  20;
  randomNumZero = String(randomNumZero).padStart(2, 0);
  console.log(randomNumZero);
  changeBg();
}

slideNext.addEventListener('click', nextSlide);
slidePrev.addEventListener('click', prevSlide);

/* ---- Погода ---- */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

function setLocalStorage2() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage2)

function getLocalStorage2() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage2)


async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=dfc640679b79f9d7d77e90ea761e51e3&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind speed: ${data.wind.speed}m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  }
  catch (err) {
    temperature.textContent = ``;
    weatherDescription.textContent = `Please enter correct city!`;
    windSpeed.textContent = ``;
    humidity.textContent = ``;
  }
  setTimeout(getWeather, 2000);
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

/* ----Цитаты ----*/

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const quotenum = Math.floor(Math.random() * data.length);
  const randomquote = data[quotenum];
  quote.textContent = randomquote.text;
  author.textContent = randomquote.author;
}
getQuotes();

function rotate() {
  changeQuote.classList.toggle('quote-rotate');
}
changeQuote.addEventListener('click', getQuotes);
changeQuote.addEventListener('click', rotate);

/* ---Аудиоплеер--- */

const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
let isPlay = false;
let playNum = 1;
import playList from './playList.js';


function playAudio() {
audio.src = playList[playNum].src;
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function playPause() {
(!isPlay) ? playAudio() : pauseAudio();
    isPlay = !isPlay;
};

function playNextTrack() {
  (playNum < 3) ? playNum ++ : playNum = 0;
  playAudio();
}

function playPrevTrack() {
  (playNum >= 1) ? playNum -- : playNum = 3;
  playAudio();
}

function toggleButton() {
  play.classList.toggle('pause');
}

play.addEventListener('click', playPause);
play.addEventListener('click', toggleButton);
playNext.addEventListener('click', playNextTrack);
playPrev.addEventListener('click', playPrevTrack);







