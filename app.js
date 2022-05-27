const input = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const realFeel = document.querySelector(".real-feel");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const weatherContainer = document.querySelector(".weather-container");
const cel = document.querySelector(".cel");
const fah = document.querySelector(".fah");

let celTemp = 0;
let celRealTemp = 0;
let fahTemp = 0;
let fahRealTemp = 0;

const getWeatherData = async (city) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f07f23c9f97577ffef18d1b46556f607`
  );
  if (response.status === 404 || response.status === 400) throw new Error();
  let data = await response.json();
  return data;
};

searchBtn.addEventListener("click", () => {
  getWeatherData(input.value)
    .then((data) => {
      console.log(data);
      weatherContainer.style = "max-height: 1000px; opacity: 1;";
      cityName.innerText = data.name;
      celTemp = Math.round(convertToCel(data.main.temp) * 10) / 10;
      celRealTemp = Math.round((data.main.feels_like - 273.15) * 10) / 10;
      fahTemp = Math.round(convertToFah(data.main.temp) * 10) / 10;
      fahRealTemp = Math.round(convertToFah(data.main.feels_like) * 10) / 10;
      if (cel.classList.contains("selected")) {
        temp.innerText = `${celTemp} °C`;
        realFeel.innerText = `Feels like: ${celRealTemp} °C`;
      } else {
        temp.innerText = `${fahTemp} °F`;
        realFeel.innerText = `Feels like: ${fahRealTemp} °F`;
      }
      wind.innerText = `Wind speed: ${data.wind.speed * 3.6} km/h`;

      weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weather.innerText = data.weather[0].description;
    })
    .catch(() => {
      alert("Not a valid city");
    });
});

cel.addEventListener("click", () => {
  fah.classList.toggle("selected");
  cel.classList.toggle("selected");
  temp.innerText = `${celTemp} °C`;
  realFeel.innerText = `Feels like: ${celRealTemp} °C`;
});

fah.addEventListener("click", () => {
  cel.classList.toggle("selected");
  fah.classList.toggle("selected");
  temp.innerText = `${fahTemp} °F`;
  realFeel.innerText = `Feels like: ${fahRealTemp} °F`;
});

function convertToCel(temp) {
  return temp - 273.15;
}

function convertToFah(temp) {
  return 1.8 * (temp - 273) + 32;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
