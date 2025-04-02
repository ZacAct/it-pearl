$(document).ready(function() {

    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: 'div',
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 2000
    });
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.primary');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down - hide header
        header.classList.add('hidden');
    } else {
        // Scrolling up - show header
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("location").value = "New Orleans";
  getWeatherForecast();
});

$(document).ready(function () {
  $("#DisplayTemp").click(getWeatherForecast);
});

const rdr2Locations = {
    "New Hanover": { latitude: 39.0997, longitude: -94.5786 },
    "Valentine": { latitude: 40.7128, longitude: -74.0060 },
    "Saint Denis": { latitude: 29.9511, longitude: -90.0715 }, // New Orleans
};

async function getWeatherForecast() {
    "use strict";
    let locationInput = document.getElementById("location").value.trim();

    if (rdr2Locations[locationInput]) {
        let locationData = rdr2Locations[locationInput];
        fetchWeatherData(locationData.latitude, locationData.longitude, locationInput);
    } else {
        let geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=10&format=json`;
        let geocodeResponse = await fetch(geocodeURL);
        if (!geocodeResponse.ok) {
            alert("Failed to fetch location data.");
            return;
        }
        let geocodeData = await geocodeResponse.json();
        if (!geocodeData.results || geocodeData.results.length === 0) {
            alert("No location found.");
            return;
        }
        let locationData = geocodeData.results[0];
        fetchWeatherData(locationData.latitude, locationData.longitude, locationData.name);
    }
}

async function fetchWeatherData(latitude, longitude, locationName) {
    let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`;
    let weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok) {
        alert("Failed to fetch weather data.");
        return;
    }
    let weatherData = await weatherResponse.json();
    let { time, temperature_2m_max, temperature_2m_min } = weatherData.daily;
    
    document.getElementById("location-info").innerHTML = `<h3>${locationName}</h3>`;
    
    let forecastTable = `<table><caption><strong>7-Day Temperature Forecast</strong></caption>
      <tr><th>Date</th><th>Max Temp (°F)</th><th>Min Temp (°F)</th></tr>`;

    let labels = [];
    let maxTemps = [];
    let minTemps = [];

    for (let i = 0; i < time.length; i++) {
      let formattedDate = new Date(time[i]).toLocaleDateString();
      forecastTable += `<tr>
        <td>${formattedDate}</td>
        <td>${temperature_2m_max[i]}°F</td>
        <td>${temperature_2m_min[i]}°F</td>
      </tr>`;

      labels.push(formattedDate);
      maxTemps.push(temperature_2m_max[i]);
      minTemps.push(temperature_2m_min[i]);
    }

    forecastTable += "</table>";
    document.getElementById("forecast-table").innerHTML = forecastTable;

    if (window.myChart) {
      window.myChart.destroy();
    }

    let ctx = document.getElementById("forecast-chart").getContext("2d");
    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Max Temperature (°F)",
            data: maxTemps,
            borderColor: "red",
            fill: false
          },
          {
            label: "Min Temperature (°F)",
            data: minTemps,
            borderColor: "blue",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
}

function clearForm() {
    "use strict";
    document.getElementById("location").value = "";
    document.getElementById("location-info").innerHTML = "";
    document.getElementById("forecast-table").innerHTML = "";

    if (window.myChart) {
        window.myChart.destroy();
    }
}
