/* ---- Определяем переменные ----*/

const time = document.querySelector('.time');
const dateIns = document.querySelector('.date');
const greetingsSpan = document.querySelector('.greeting');
const name = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

/* ----Вывод времени---- */

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

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours);
    function getTimeOfDay() {
        let timeOfDay =
            (hours <= 6) ? "Night"
                : (hours <= 11) ? "Morning"
                    : (hours <= 18) ? 'Day'
                        : (hours <= 24) ? "Evening" 
                        : "unknown";
        const greetingText = `Good ${timeOfDay},`;
        greetingsSpan.textContent = greetingText;
        console.log(greetingText);
    }
    getTimeOfDay();

};

showGreeting();

/* ----Запись имени---- */

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)

  /* ---- Слайдер изображений ---- */
  


  /* ---- Погода ---- */

  function setLocalStorage2() {
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorage2)

  function getLocalStorage2() {
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
  }
  window.addEventListener('load', getLocalStorage2)

  
  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind speed: ${data.wind.speed}m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    setTimeout(showTime, 60000);
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
  async function getQuotes() {  
    const quotes = 'js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    const quotenum = Math.floor(Math.random()*data.length);
    const randomquote = data[quotenum];

    quote.textContent = randomquote.text;
    author.textContent = randomquote.author;
    setTimeout(getQuotes, 10000);
  }
  getQuotes();

  changeQuote.addEventListener('click', getQuotes);


