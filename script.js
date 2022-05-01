"use strict";

const input = document.querySelector(".city-input");
const suloxxxxx = document.querySelector("#search-btn");
const clear = document.querySelector("#clear-all");
const map = document.querySelector("#map");
const clock = document.querySelector(".clock");
const time = document.querySelector(".time");
const period = document.querySelector(".period");
const tempInfo = document.querySelector(".weather-temp");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDesc = document.querySelector(".weather-desc");
const fullReport = document.querySelector('.full-report')

input.value = "tokyo";
fetchWeatherData();

function fetchWeatherData() {
    let cityName = input.value;
    if (!cityName) {
        console.error("Please enter a city name! 🔫");
        return;
    }
    const weatherData = {};

    axios
        .get(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityName +
            "&appid=40505836c473231f7ee6e2bff31db894"
        )
        .then(function(response) {
            console.log(response.data);
            const data = response.data;
            const weatherData = {
                coordinates: data.coord,
                currTime: new Date((data.dt + data.timezone) * 1000),
                cityName: data.name,
                timezone: data.timezone / (60 * 60),
                iconURL: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png",
                description: data.weather[0].description
            };
            //   weatherData["coordinates"] = response.data.coord;
            // weatherData["currTime"] = new Date(
            //     (response.data.dt + response.data.timezone) * 1000
            // );
            // weatherData["cityName"] = response.data.name;
            // weatherData["timezone"] = response.data.timezone / (60 * 60);
            // weatherData["icon"] = response.data.weather[0].icon;
            fullReport.innerHTML = `
            City Name: ${weatherData.cityName}<br>
            Fetched on: ${weatherData.currTime}<br>
            Coordinates: 
                lat:${weatherData.coordinates.lat}
                lon:${weatherData.coordinates.lon}<br>
            Timezone: ${weatherData.timezone}
            `;

            //set main temp in degs
            const tempInDeg = (response.data.main.temp - 273.15).toFixed(2);
            tempInfo.innerHTML = tempInDeg + "°C";

            //set weather icon from openweatherapi
            weatherIcon.src = weatherData.iconURL;

            //set weather description
            weatherDesc.innerHTML = weatherData.description

            map.style.display = "block";
            map.src =
                "https://maps.google.com/maps?q=" +
                weatherData.cityName +
                "&output=embed";
        })
        .catch(function(error) {
            map.style.display = "none";
            alert("SORRY! please enter a valid city name🥴");
            if (error.cod == 404) console.log("Not a valid city name!😑🥺");
            else console.log(error);
        });
}

function checkEnter(e) {
    if (e.keyCode == 13) fetchWeatherData();
}

input.addEventListener("keypress", checkEnter);
suloxxxxx.addEventListener("click", fetchWeatherData);
clear.addEventListener("click", function() {
    input.value = "";
    console.log("testing");
});
const weatherImg = {
    sunny: "./assets/sunny.png",
    rainy: "./assets/rainy.png",
    cloudy: "./assets/cloudy.png",
};

// clock.addEventListener("click", function() {
//     // clock.style.top = '-100px'
// });