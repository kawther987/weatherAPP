"use strict";
//variable
const weather = document.querySelector(".row");
const mode = document.querySelector(".mode");
const searchInput = document.getElementById("searchInput");
let finalResponse = "";

const today = new Date();

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/***************************************************/
//Functions

//change background image
function changeBg() {
  const img = [
    'url("./img/bg.jpg")',
    'url("./img/bg2.jpg")',
    'url("./img/bg3.jpg")',
    'url("./img/bg4.jpg")',
    'url("./img/bg5.jpg")',
    'url("./img/bg6.jpg")',
  ];

  const body = document.body;

  const bg = img[Math.floor(Math.random() * img.length)];

  body.style.backgroundImage = bg;
}

//change between modes
function changeMode() {
  document.body.classList.toggle("darkMode");
  if (document.body.classList.contains("darkMode")) {
    mode.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
  } else {
    mode.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
  }
}

//Get Api link
async function getWeather(city = "cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=2d0cd7d4f1d9434a9b6183313240601&q=${city}&days=3`
  );
  if (response.ok == true) {
    finalResponse = await response.json();
    console.log(finalResponse);
    displayToday();
    nextWeather();
  }
}

//show today weather
function displayToday() {
  let cartona = ` 
      <div class="today-weather col-md-4 my-5 py-4 shadow-lg px-3">
         <div class="d-flex justify-content-between">
              <p class="day">${weekDays[today.getDay()]}</p>
              <p class="date">${
                (today.getDate() < 10 ? "0" : "") + today.getDate()
              } ${allMonths[today.getMonth()]}</p>
        </div>
        <div>
              <p class="city">${finalResponse.location.name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="deg">${finalResponse.current.temp_c}<sup>o</sup>C</p>
                <img src="${
                  finalResponse.current.condition.icon
                }" alt="weather icon" class="w-25">
              </div>
              <p class="clear">${finalResponse.current.condition.text}</p>
        </div>
        <div class="wIcons d-flex justify-content-between">
              <div>
                <i class="bi bi-umbrella"></i>
                <span>${finalResponse.current.humidity}%</span>
              </div>
              <div>
                <i class="bi bi-wind"></i>
                <span>${finalResponse.current.wind_kph} km/h</span>
              </div>
              <div>
                <i class="bi bi-compass"> </i>
                <span>${finalResponse.current.wind_dir}</span>
              </div>
        </div>
      </div>
            `;

  weather.innerHTML = cartona;
}

//show next Weather
function nextWeather() {
  let cartona = "";
  let tomorrow = finalResponse.forecast.forecastday;
  console.log(tomorrow);
  for (let i = 0; i < 2; i++) {
    cartona = `
            <div class="tomorrow text-center col-md-4 my-5 py-4 shadow-lg px-3">
              <p>${weekDays[today.getDay() + i + 1]}</p>
              <img src="${
                tomorrow[i + 1].day.condition.icon
              }" class="w-25 mb-2" alt="weather">
              <p>${tomorrow[i + 1].day.maxtemp_c}<sup>o</sup>C</p>
              <p class="py-2">${tomorrow[i + 1].day.mintemp_c}<sup>o</sup>C</p>
              <p class="clear">${tomorrow[i + 1].day.condition.text}</p>
            </div>`;

    weather.innerHTML += cartona;
  }
}
/***************************************************/
//calling
changeBg();
setInterval(changeBg, 5000);
getWeather();

/****************************************************/
//Events
mode.addEventListener("click", changeMode);

searchInput.addEventListener("input", () => {
  getWeather(searchInput.value);
});

/*** */

// if ("geolocation" in navigator) {
//   // Get the user's current position
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       // Success callback
//       let latitude = position.coords.latitude;
//       let longitude = position.coords.longitude;

//       // Display the location information
//       document.getElementById("location-info").innerHTML =
//         "Latitude: " + latitude + "<br>Longitude: " + longitude;
//     },
//     function (error) {
//       // Error callback
//       console.error("Error getting location:", error.message);
//       document.getElementById("location-info").innerHTML =
//         "Error getting location: " + error.message;
//     }
//   );
// } else {
//   // Geolocation is not supported
//   document.getElementById("location-info").innerHTML =
//     "Geolocation is not supported by your browser.";
// }
