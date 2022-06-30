
let apiKey = "95c346137f1a7a732a951de63cafdb0a";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?`;


function showTime(newDate) {
  let time = new Date(newDate);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[time.getDay()];
  let currentHours = time.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = time.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let fullTime = `${currentDay} ${currentHours}:${currentMinutes}`;
  return fullTime;
}
function showWeather(response) {
  let choosenCity=response.data.name;
  document.querySelector("#city").innerHTML=choosenCity;
  tempCelsius= response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML = Math.round(tempCelsius);
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
  let icon= response.data.weather[0].icon;
  document.querySelector("#currentIcon").setAttribute("src", `images/icons/${icon}.png`)
  let date=response.data.dt * 1000;
  document.querySelector("#currentTime").innerHTML=showTime(date);
}
function searchCity(city) {
  let apiWeatherCity = `${apiWeather}q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiWeatherCity).then(showWeather);
}
function showData(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enterCity").value;
  searchCity(enterCity);
}


function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiWeatherPosition = `${apiWeather}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherPosition).then(showWeather);
}
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
function showF(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temp=document.querySelector("#currentTemp");
  let currentTempF=(tempCelsius)*9/5+32;
  temp.innerHTML =Math.round(currentTempF);
}
function showC(event){
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temp=document.querySelector("#currentTemp");
  temp.innerHTML =Math.round(tempCelsius);
}
searchCity("Kyiv");
let changeCity = document.querySelector("#changeCity");
changeCity.addEventListener("submit", showData);

let buttonPosition = document.querySelector("#currentLocation");
buttonPosition.addEventListener("click", showLocation);

let tempCelsius=null;


let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showF);
let celsius=document.querySelector("#celsius");
celsius.addEventListener("click",showC)

  
  