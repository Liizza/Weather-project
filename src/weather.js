
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
function formatDay(newDate) {
  let date = new Date(newDate * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response){
  let forecast = response.data.daily;
  let forecast5days = document.querySelector("#forecast5days");
  let forecastData=`<div>`;
  document.querySelector("#maxTemp").innerHTML=Math.round(forecast[0].temp.max);
  document.querySelector("#minTemp").innerHTML=Math.round(forecast[0].temp.min);
  forecast.forEach(function (forecastDay, index) {
    if(index<6&&index>0){
      tempMinCelsiusForecast=forecastDay.temp.min;
      tempMaxCelsiusForecast=forecastDay.temp.max;
      forecastData=forecastData+`
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            <div class="row">
              <div class="col">
              ${formatDay(forecastDay.dt)}
              </div>
              <div class="col">
                <img src="images/icons/${
                  forecastDay.weather[0].icon
                }.png" class="forecastIcon" width="70">
              </div>
              <div class="col-6" >
                H:<span class="maxTempDays">${Math.round(tempMaxCelsiusForecast)}</span>° L:<span class="minTempDays">${Math.round(tempMinCelsiusForecast)}</span>°
              </div>
            </div>
          </h5>
        </div>
      </div>`;
    }
  });
  forecastData=forecastData+`</div>`;
  forecast5days.innerHTML=forecastData; 
}
function searchForecast(coordinates) {
  let apiWeatherForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherForecast).then(showForecast);
}
function showWeather(response) {
  let choosenCity=response.data.name;
  document.querySelector("#city").innerHTML=choosenCity;
  tempCelsius= response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML = Math.round(tempCelsius);
  let description = response.data.weather[0].main;
  document.querySelector("#description").innerHTML = description;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = wind;
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidity;
  let icon= response.data.weather[0].icon;
  document.querySelector("#currentIcon").setAttribute("src", `images/icons/${icon}.png`)
  let date=response.data.dt * 1000;
  document.querySelector("#currentTime").innerHTML=showTime(date);
  searchForecast(response.data.coord);
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
let tempMinCelsiusForecast=null;
let tempMaxCelsiusForecast=null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showF);
let celsius=document.querySelector("#celsius");
celsius.addEventListener("click",showC)

  
  