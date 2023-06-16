
// write your code here
// console.log(weather["paris"].temp);
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let apiKey = "5863935ee9cca4c02ed68203f807c65b";
let units = "metric";
const searchBtn = document.getElementById("search");
const temp = document.getElementById("temperature");
let tempwithCelesium = temp.innerHTML;
const changeToFarenheit = document.getElementById("fahrenheit");
const changeToCelsius = document.getElementById("celsius");
const cityName = document.getElementById("city-name");
const currentBtn = document.getElementById("current");
const humiditity = document.getElementById("humiditity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");

function searchCity(cityName, cities) {
  if (cityName in cities) {
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${name}`
    );
  }
}
function displayInfoCity(event) {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");
  const cityInputVlue = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVlue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempAndNameCity);
}

function displayCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

function showCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempAndNameCity);
}

function showTempAndNameCity(response) {
  let infoCity = response.data;
  let getCityName = infoCity.name;
  let getTemp = Math.round(infoCity.main.temp);
  let getHumiditity = infoCity.main.humidity;
  let getWind = infoCity.wind.speed;
  let getDescription = infoCity.weather[0].description;
  console.log(infoCity);
  cityName.innerHTML = getCityName;
  temp.innerHTML = `${getTemp}°C`;
  tempwithCelesium = temp.innerHTML;
  humiditity.innerHTML = getHumiditity;
  wind.innerHTML = getWind;
  description.innerHTML = getDescription;
}

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTime() {
  const date = new Date();
  const day = date.getDay();
  const dayName = dayNames[day];
  const dateInfo = document.getElementById("date-info");
  const timeInfo = document.getElementById("time");

  dateInfo.innerHTML = dayName;
  timeInfo.innerHTML = formatTime(date);
}

let isCelesium = true;
function converteToCelesium(event) {
  event.preventDefault();
  isCelesium = true;
  displayTemp();
}

function converteToFarenheit(event) {
  event.preventDefault();
  isCelesium = false;
  displayTemp();
}

function displayTemp() {
  if (isCelesium) {
    temp.innerHTML = tempwithCelesium;
  } else {
    const tempWithFarenhiet = (parseInt(temp.innerHTML) * 9) / 5 + 32 + "°F";
    temp.innerHTML = tempWithFarenhiet;
  }
}

showTime();

searchBtn.addEventListener("click", displayInfoCity);

currentBtn.addEventListener("click", displayCurrentTemp);

changeToFarenheit.addEventListener("click", converteToFarenheit);

changeToCelsius.addEventListener("click", converteToCelesium);
