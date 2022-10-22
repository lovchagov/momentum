const langRU = {
  'lang': 'ru',
  'greeting': ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'],
  'locale': 'ru-RU',
  'defaultCity': 'Минск',
  'weatherDesc': ['Скорость ветра: ', 'м/с', 'Влажность: ', 'Ошибка! ', 'не найден!'],
  'quotes': 'js/data.json',
  'namePlaceholder': '[Введите имя]',
  'bgTagsPlaceholder': '[Введите теги]',
  'settings': { 'lang': 'Язык:', 'bgSourceHeader': 'Источник фоновых изображений:', 'widgets': ['Виджеты: ', 'Аудиоплеер', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитата дня', 'Автор', 'Ссылки', 'Ввод'] }
}
const langEN = {
  'lang': 'en',
  'greeting': ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'],
  'locale': 'en-EN',
  'defaultCity': 'Minsk',
  'weatherDesc': ['Wind speed: ', 'm/s', 'Humidity: ', 'Error! ', 'Not found!'],
  'quotes': 'js/dataen.json',
  'namePlaceholder': '[Enter name]',
  'bgTagsPlaceholder': '[Enter tags]',
  'settings': { 'lang': 'Language:', 'bgSourceHeader': 'Background source:', 'widgets': ['Widgets: ', 'Music', 'Weather', 'Time', 'Date', 'Greetings', 'Quote of Day', 'Author', 'Links', 'Enter'] }
}
let lang = langRU;
const language = document.getElementsByName('language');

function languageChange() {
  if (language[0].checked)
    lang = langEN;
  else if (language[1].checked)
    lang = langRU;
  setTimeout(languageChange, 1000);
}
languageChange();

const elementsch = document.querySelector('.elementsch')
const music = document.querySelector('.musicch');
const weatherch = document.querySelector('.weatherch');
const timech = document.querySelector('.timech');
const datech = document.querySelector('.datech');
const greetingsch = document.querySelector('.greetingsch');
const quotesch = document.querySelector('.quotesch');
const authorch = document.querySelector('.authorch');
const wallpapercheck = document.querySelector('.wallpapercheck');
const languagech = document.querySelector('.languagech')
const backgroundsch = document.querySelector('.backgroundsch');
const linksch = document.querySelector('.linksch');

const elemArr = [elementsch, music, weatherch, timech, datech, greetingsch, quotesch, authorch, linksch, wallpapercheck]





function changelangsetmusic() {
  for (let i = 0; i < elemArr.length; i++) {
    elemArr[i].textContent = lang.settings.widgets[i];
  }
  backgroundsch.textContent = lang.settings.bgSourceHeader;
  languagech.textContent = lang.settings.lang;
  setTimeout(changelangsetmusic, 1000)
}





changelangsetmusic();




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
  var currentDate
  (lang === langEN) ? currentDate = date.toLocaleDateString('en-EN', options) : currentDate = date.toLocaleDateString('ru-RU', options);
  dateIns.textContent = currentDate;
};

showDate();

/* ----Приветствие--- */

const greetingsSpan = document.querySelector('.greeting');
const name = document.querySelector('.name');
const main = document.querySelector('.greeting-container');



function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay =
    (hours <= 6) ? `${lang.greeting[0]}`
      : (hours <= 11) ? `${lang.greeting[1]}`
        : (hours <= 18) ? `${lang.greeting[2]}`
          : (hours <= 24) ? `${lang.greeting[3]}`
            : "unknown";
  const greetingText = timeOfDay;
  greetingsSpan.textContent = greetingText;
  setTimeout(showGreeting, 1000)
  name.placeholder = `${lang.namePlaceholder}`
};

showGreeting();

/* ----Запись имени---- */

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  name.value = localStorage.getItem('name');
}
window.addEventListener('load', getLocalStorage)



/* ---- Слайдер изображений ---- */

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const drone = document.getElementsByName('drone');
const tags = document.querySelector('.tags');
const wallpaperCheck = document.querySelector('.wallpapercheck');

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

/*---Unsplash---*/
async function getLinkToImageUnsplash() {
  var url = '';
  if (tags.value.length !== 0) {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.value}&client_id=Q_RW3-8v7-cY_L7_YW3kPscRSWglvyJoYXCpR4XvZ6Y`;
  }
  else {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=Q_RW3-8v7-cY_L7_YW3kPscRSWglvyJoYXCpR4XvZ6Y`;
  };
  const res = await fetch(url);
  const data = await res.json();
  var img = new Image();
  img.src = data.urls.regular
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};

/*---Flickr---*/

async function getLinkToImageFlickr() {
  var url = '';
  if (tags.value.length !== 0) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cc7b9325db870260e70726b35261ae5&tags=${tags.value}&extras=url_l&format=json&nojsoncallback=1`;
  }
  else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cc7b9325db870260e70726b35261ae5&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  };
  const res = await fetch(url);
  const data = await res.json();
  var img = new Image();
  img.src = data.photos.photo[randomNum].url_l
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};

/*--- Функция выбора источник обоев ---*/

function wallpaper() {

  /*--- Если первая радиокнопка - то из моего ГитХаба ---*/

  if (drone[0].checked) {
    body.style.backgroundImage = `url(https://raw.githubusercontent.com/lovchagov/momentumgallery/263defe97b9e2b85cd35821ea218bdf2b97aef8f/${timeOfDay}/${randomNumZero}_optimized.jpg)`;
  }

  /*--- Если вторая радиокнопка - то из Unsplash ---*/

  else if (drone[1].checked) {
    getLinkToImageUnsplash();

  }

  /*--- Если третья радиокнопка - то из Flickr ---*/

  else if (drone[2].checked) {
    getLinkToImageFlickr();

  }

};

wallpaper();

wallpaperCheck.addEventListener('click', wallpaper);

/*--- Функция создания изображения для отображения только после полной загрузки ---*/

function changeBg() {
  var img = new Image();
  img.src = `https://raw.githubusercontent.com/lovchagov/momentumgallery/263defe97b9e2b85cd35821ea218bdf2b97aef8f/${timeOfDay}/${randomNumZero}_optimized.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
};


/*--- Функция следущего слайда из коллекции GitHub ---*/

function nextSlide() {
  (randomNumZero < 20) ? randomNumZero++ : randomNumZero = 1;
  randomNumZero = String(randomNumZero).padStart(2, 0);
  console.log(randomNumZero);
  changeBg();
}

/*--- Функция предыдущего слайда из коллекции GitHub ---*/

function prevSlide() {
  (randomNumZero > 1) ? randomNumZero-- : randomNumZero = 20;
  randomNumZero = String(randomNumZero).padStart(2, 0);
  console.log(randomNumZero);
  changeBg();
};

/*--- Функция следущего слайда в зависимости от источника изображений---*/

function nextSlideupd() {
  if (drone[0].checked) {
    nextSlide()
  }
  else if (drone[1].checked) {
    getLinkToImageUnsplash();
  }
  else if (drone[2].checked) {
    getLinkToImageFlickr();
  }
};

/*--- Функция предыдущего слайда в зависимости от источника изображений---*/

function prevSlideupd() {
  if (drone[0].checked) {
    prevSlide()
  }
  else if (drone[1].checked) {
    getLinkToImageUnsplash();
  }
  else if (drone[2].checked) {
    getLinkToImageFlickr();
  }
};

const tagschange = () => {
  tags.placeholder = `${lang.bgTagsPlaceholder}`;
  setTimeout(tagschange, 1000)
}
tagschange()

slideNext.addEventListener('click', nextSlideupd);
slidePrev.addEventListener('click', prevSlideupd);


/* ---- Погода ---- */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weather = document.querySelector('.weather');

function setLocalStorage2() {
  localStorage.setItem('city', city.value);
  localStorage.setItem('humidity',humidity.textContent);
  localStorage.setItem('windSpeed',windSpeed.textContent);
  localStorage.setItem('temperature',temperature.textContent);
}
window.addEventListener('beforeunload', setLocalStorage2)

function getLocalStorage2() {
    city.value = localStorage.getItem('city');
    humidity.textContent = localStorage.getItem('humidity');
    windSpeed.textContent = localStorage.getItem('windSpeed');
    temperature.textContent = localStorage.getItem('temperature');
  }
window.addEventListener('load', getLocalStorage2)



async function getWeather() {
  try {
    var url
    if (lang === langEN) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=dfc640679b79f9d7d77e90ea761e51e3&units=metric`;
    }
    else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=dfc640679b79f9d7d77e90ea761e51e3&units=metric`;
    }
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${lang.weatherDesc[0]} ${data.wind.speed}m/s`;
    humidity.textContent = `${lang.weatherDesc[2]} ${data.main.humidity}%`
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
const quoteContainer = document.querySelector('.quotecontainer')

async function getQuotes() {

  const quotes = `${lang.quotes}`;
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
const songName = document.querySelector('.song-name');
const playListIn = document.querySelector('.play-list');
const progressBar = document.querySelector('#progress-bar');
const player = document.querySelector('.playerandplaylist');
const audioVolProgress = document.querySelector('.audio-vol-progress');
const audioMuteBtn = document.querySelector('.audio-vol-toggle');
const playlistIcon = document.querySelector('.play-list-icon');


let isPlay = false;
let playNum = 0;
let audioVolume = 0.2;
import playList from './playList.js';

const audioMute = () => {
  audioMuteBtn.classList.toggle('fa-volume-up');
  audioMuteBtn.classList.toggle('fa-volume-mute');
  if (audio.volume) audio.volume = 0
  else audio.volume = audioVolume;
}

audioMuteBtn.addEventListener('click', audioMute)

const audioVolumeChange = () => {
  audioVolume = audioVolProgress.value / 100;
  audio.volume = audioVolume;
  audioMuteBtn.className = !audioVolume
    ? 'fas fa-volume-mute audio-vol-toggle'
    : audioVolume < 0.31
      ? 'fas fa-volume-down audio-vol-toggle'
      : 'fas fa-volume-up audio-vol-toggle'
};
audioVolumeChange();
audioVolProgress.addEventListener('change', audioVolumeChange);

const plUpdate = () => {
  playlistArr.forEach((i, index) => {
    i.style.color = 'white'
    if (playNum === index) i.style.color = "rgba(96, 172, 252, 1)"
  })
}

function changeTrack() {
  audio.src = playList[playNum].src;
  songName.textContent = playList[playNum].title;
};
changeTrack();

function playAudio() {
  audio.play();
};

function pauseAudio() {
  audio.pause();

}

function playPause() {
  (!isPlay) ? playAudio() : pauseAudio();
  isPlay = !isPlay;
  plUpdate();
};

function playNextTrack() {
  (playNum < 3) ? playNum++ : playNum = 0;
  changeTrack();
  pauseAudio();
  playAudio();
  plUpdate();
  play.classList.add('pause');
}


function playPrevTrack() {
  (playNum >= 1) ? playNum-- : playNum = 3;
  changeTrack();
  pauseAudio();
  playAudio();
  plUpdate();
  play.classList.add('pause');
}

function toggleButton() {
  play.classList.toggle('pause');
}

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
  if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
    document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
    document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
  }
};

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
};

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  playListIn.append(li);
  li.innerHTML = `${"<img src='./assets/svg/play.svg'></img>"} ${playList[i].title}`;
};

const playlistArr = document.querySelectorAll('.play-list > li')

for (let i = 0; i < playlistArr.length; i++) {
  playlistArr[i].addEventListener('click', function changeTrack1() {
    playNum = i;
    changeTrack();
    pauseAudio();
    playAudio();
    plUpdate();
    play.classList.add('pause');
  })
}

function togglePlaylist() {
  playListIn.classList.toggle('active');
}


play.addEventListener('click', playPause);
play.addEventListener('click', toggleButton);
playNext.addEventListener('click', playNextTrack);
playPrev.addEventListener('click', playPrevTrack);
audio.addEventListener('ended', playNextTrack);
progressBar.addEventListener('change', changeProgressBar);
playlistIcon.addEventListener('click', togglePlaylist);





/*** Links ***/

const linkDirection = document.querySelector('#link-direction');
const linkName = document.querySelector('#link-name');
const linkList = document.querySelector('.links-list')
const linkListAll = document.querySelectorAll('.links-list > li')
const addlink = document.querySelector('.addlink');
const linkIcon = document.querySelector('.link-icon');
const linkss = document.querySelector('.linkss');
const linkAddBlock = document.querySelector('.link-add');


function addelem() {
  if (linkDirection.value.length !== 0) {
    const lil = document.createElement('li');
    linkList.append(lil);
    const lila = document.createElement('a');
    lil.append(lila);
    lila.setAttribute('href', `https://${linkDirection.value}`);
    lila.setAttribute('target', '_blank')
    const lilaimg = document.createElement('img');
    lilaimg.setAttribute('src', `https://www.google.com/s2/favicons?domain=${linkDirection.value}`);
    lilaimg.setAttribute('alt', linkName.value)
    lila.prepend(lilaimg);
    lila.innerHTML = linkName.value
    console.log(linkListAll)
  }

  else if (linkName.value == 0) {
    linkName.value = linkDirection.value
  }


  else {
    alert("Error: Enter data")
  }
};



addlink.addEventListener('click', addelem)
linkIcon.addEventListener('click', function linksact() {
  linkAddBlock.classList.toggle('nonactive')
})

/*---- Настройки ---- */

const settingsIcon = document.querySelector('.settings-icon > img');
const backgroundSource = document.querySelector('.background-source');
const authorContainer = document.querySelector('.authorme');
const settings = [player, weather, time, dateIns, main, quoteContainer, authorContainer, linkss];
const checkBoxes = document.getElementsByName('interest');
const languageCheckboxes = document.getElementsByName('language');





function setLocalStorage3() {
  localStorage.setItem('player', checkBoxes[0].checked)
};

window.addEventListener('beforeunload', setLocalStorage3)
console.log(checkBoxes[1].checked);
function getLocalStorage3() {
  localStorage.getItem('player');
}
window.addEventListener('load', getLocalStorage3);
console.log(checkBoxes[1].checked);



function checkBoxesCheck() {
  for (let i = 0; i < checkBoxes.length; i++) {
    if (!checkBoxes[i].checked) {
      settings[i].classList.add('nonactive');
    }
    else
      settings[i].classList.remove('nonactive');
    ;
  };

  setTimeout(checkBoxesCheck, 1000);

};
checkBoxesCheck()



function visible() {
  backgroundSource.classList.toggle('active');
}

settingsIcon.addEventListener('click', visible);

const langcha = () => {
  lang = langEN;
  getQuotes();
}

const langcha2 = () => {
  lang = langRU;
  getQuotes();
}

languageCheckboxes[1].addEventListener('change', langcha2)
languageCheckboxes[0].addEventListener('change', langcha)


















