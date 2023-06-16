// write your code here
// console.log(weather["paris"].temp);

let apiKey = "5863935ee9cca4c02ed68203f807c65b";
let units = "metric";
const searchBtn = document.getElementById("search");
const tempElement = document.getElementById("temperature");
let tempwithCelesium = null;
const changeToFarenheit = document.getElementById("fahrenheit");
const changeToCelsius = document.getElementById("celsius");
const cityNameElement = document.getElementById("city-name");
const currentBtn = document.getElementById("current");
const humiditityElement = document.getElementById("humiditity");
const windElement = document.getElementById("wind");
const descriptionElement = document.getElementById("description");
const dateElement = document.getElementById("date");
const iconElement = document.getElementById("icon");

function displayInfoCity(event) {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");
  const cityInputVlue = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVlue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

function showCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let infoCity = response.data;
  let getCityName = infoCity.name;
  let getTemp = Math.round(infoCity.main.temp);
  let getHumiditity = infoCity.main.humidity;
  let getWind = infoCity.wind.speed;
  let getDescription = infoCity.weather[0].description;
  let getData = infoCity.dt;
  let getIcon = infoCity.weather[0].icon;
  tempwithCelesium = getTemp;
  console.log(infoCity);
  cityNameElement.innerHTML = getCityName;
  tempElement.innerHTML = getTemp;
  tempwithCelesium = tempElement.innerHTML;
  humiditityElement.innerHTML = getHumiditity;
  windElement.innerHTML = getWind;
  descriptionElement.innerHTML = getDescription;
  dateElement.innerHTML = formatDate(getData * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${getIcon}@2x.png`
  );
  iconElement.setAttribute("alt", getDescription);
}

function formatDate(timestamp) {
  const date = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = date.getDay();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const dayName = dayNames[day];

  return `${dayName} ${hours}:${minutes}`;
}

let isCelesium = true;
function converteToCelesium(event) {
  event.preventDefault();
  changeToCelsius.classList.add("active");
  changeToFarenheit.classList.remove("active");
  tempElement.innerHTML = tempwithCelesium;
}

function converteToFarenheit(event) {
  event.preventDefault();
  changeToCelsius.classList.remove("active");
  changeToFarenheit.classList.add("active");
  const tempWithFarenhiet = (parseInt(tempwithCelesium) * 9) / 5 + 32;
  tempElement.innerHTML = tempWithFarenhiet;
}

searchBtn.addEventListener("click", displayInfoCity);

currentBtn.addEventListener("click", displayCurrentTemp);

changeToFarenheit.addEventListener("click", converteToFarenheit);

changeToCelsius.addEventListener("click", converteToCelesium);
