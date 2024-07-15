let position;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolokalisierung wird von diesem Browser nicht unterstützt.");
  }
}

function successCallback(pos) {
  position = pos;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  fetch(weatherAPI)
    .then((res) => res.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen der Wetterdaten:", error);
    });
}

function errorCallback(error) {
  alert("Ein Fehler ist aufgetreten. Fehlercode: " + error.code);
}

function displayWeather(data) {
  const tempInfo = document.getElementById("temp-info");
  const descriptionInfo = document.getElementById("description-info");
  const funnyMessage = document.getElementById("funny-message");
  const weatherIcon = document.getElementById("weather-icon");

  const temperature = data.current_weather.temperature;
  const weatherCode = data.current_weather.weathercode;

  tempInfo.textContent = `Es sind ${temperature}°C draußen!`;
  descriptionInfo.textContent = `Wettercode: ${weatherCode}`;
  weatherIcon.src = getWeatherIcon(weatherCode);

  const funnyMessages = [
    "Vergiss deinen Sonnenhut nicht!",
    "Perfektes Wetter für ein Nickerchen!",
    "Tolles Wetter für einen Spaziergang!",
    "Trink genug Wasser!",
    "Zeit, die Sonnenbrille auszupacken!",
  ];
  funnyMessage.textContent =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
}

function getWeatherIcon(code) {
  const iconMap = {
    0: "./assets/klarer-himmel.png",
    1: "./assets/t-bewölkt.png", //
    2: "./assets/wolke.png",
    61: "./assets/leichter-regen.png",
    63: "./assets/mittle-regen.png",
    65: "./assets/stark-regen.png",
  };
  return iconMap[code] || "./assets/default.png";
}

getLocation();
