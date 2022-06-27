let now = new Date();
let apiKey = "95c346137f1a7a732a951de63cafdb0a";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?`;
let enterCity = document.querySelector("#enterCity");

function showNow(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[newDate.getDay()];
  let currentHours = newDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = newDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let fullTime = `${currentDay} ${currentHours}:${currentMinutes}`;
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${fullTime}`;
}
function showTemp(response) {
  let tempCity = Math.round(response.data.main.temp);
  document.querySelector("#currentTemp").innerHTML = tempCity;
  let description = response.data.weather[0].main;
  document.querySelector("#description").innerHTML = description;
  let maxTemp = Math.round(response.data.main.temp_max);
  document.querySelector("#maxTemp").innerHTML = maxTemp;
  let minTemp = Math.round(response.data.main.temp_min);
  document.querySelector("#minTemp").innerHTML = minTemp;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = wind;
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidity;
}
function changeWeather() {
  let currentCity = document.querySelector("#city").textContent;
  let apiWeatherCity = `${apiWeather}q=${currentCity}&appid=${apiKey}&&units=metric`;
  axios.get(apiWeatherCity).then(showTemp);
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = enterCity.value;
  changeWeather();
}
function currentLocationWeather(response) {
  showTemp(response);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiWeatherPosition = `${apiWeather}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherPosition).then(currentLocationWeather);
}
function showLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
showNow(now);
let changeCity = document.querySelector("form.changeCity");
changeCity.addEventListener("submit", showCity);
changeWeather();
let buttonPosition = document.querySelector("#currentLocation");
buttonPosition.addEventListener("click", showLocation);

let fahrenheit = document.querySelector("#fahrenheit");
function showF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = "63";
}
fahrenheit.addEventListener("click", showF);
