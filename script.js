"use strict";

const input = document.querySelector(".city-input");
const suloxxxxx = document.querySelector("#search-btn");
const clear = document.querySelector("#clear-all");
const data = document.querySelector(".data");
const map = document.querySelector('#map')

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
            // console.log(response.data);
            weatherData["coordinates"] = response.data.coord;
            weatherData["currTime"] = new Date(
                (response.data.dt + response.data.timezone) * 1000
            );
            weatherData["cityName"] = response.data.name;
            weatherData["timezone"] = response.data.timezone / (60 * 60);
            data.innerHTML = `
            City Name: ${weatherData.cityName}<br>
            Fetched on: ${weatherData.currTime}<br>
            Coordinates: 
                lat:${weatherData.coordinates.lat}
                lon:${weatherData.coordinates.lon}<br>
            Timezone: ${weatherData.timezone}
            `;
            map.style.display = "block"
            map.src = "https://maps.google.com/maps?q=" + weatherData.cityName + "&output=embed"

        })
        .catch(function(error) {
            map.style.display = "none"
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
    sunny: './assets/sunny.png',
    rainy: './assets/rainy.png',
    cloudy: './assets/cloudy.png',
}