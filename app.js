let position;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
    });
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
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Benutzer hat die Geolokalisierungsanfrage abgelehnt.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Standortinformationen sind nicht verfügbar.");
      break;
    case error.TIMEOUT:
      alert("Die Anfrage nach dem Standort ist abgelaufen.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Ein unbekannter Fehler ist aufgetreten.");
      break;
  }
}

function displayWeather(data) {
  const tempInfo = document.getElementById("temp-info");
  const descriptionInfo = document.getElementById("description-info");
  const funnyMessage = document.getElementById("funny-message");
  const weatherIcon = document.getElementById("weather-icon");

  const temperature = data.current_weather.temperature;
  const weatherCode = data.current_weather.weathercode;
  const weatherDescription = getWeatherDescription(weatherCode);

  tempInfo.textContent = `Es sind ${temperature}°C draußen!`;
  descriptionInfo.textContent = weatherDescription;
  weatherIcon.src = getWeatherIcon(weatherCode);

  const funnyMessageText = getFunnyMessage(weatherCode);
  funnyMessage.textContent = funnyMessageText;
}

function getWeatherDescription(code) {
  const descriptionMap = {
    0: "klarer Himmel",
    1: "teilweise bewölkt",
    2: "bewölkt",
    3: "bedeckt",
    61: "leichter Regen",
    63: "mäßiger Regen",
    65: "starker Regen",
  };
  return descriptionMap[code] || "unbekanntes Wetter";
}

function getWeatherIcon(code) {
  const iconMap = {
    0: "./assets/klarer-himmel.png",
    1: "./assets/t-bewölkt.png",
    2: "./assets/wolke.png",
    3: "./assets/bedeckt.png",
    61: "./assets/leichter-regen.png",
    63: "./assets/mittle-regen.png",
    65: "./assets/stark-regen.png",
  };
  return iconMap[code] || "./assets/default.png";
}

function getFunnyMessage(code) {
  const funnyMessagesMap = {
    0: [
      "Perfektes Wetter für eine Sonnenbrille!",
      "Sonnencreme nicht vergessen!",
      "Wie wäre es mit einem Eis im Park?",
    ],
    1: [
      "Ein bisschen Wolken, aber trotzdem schön!",
      "Vielleicht ein guter Tag für einen Spaziergang.",
      "Perfektes Wetter für ein Picknick!",
    ],
    2: [
      "Ganz schön bewölkt heute, ideal für ein Buch!",
      "Ein guter Tag, um einen Film zu schauen.",
      "Wolken! Ein gutes Zeichen für Entspannung.",
    ],
    3: [
      "Bedeckt, ein gemütlicher Tag drinnen!",
      "Wie wäre es mit einem Kaffee und einem Buch?",
      "Perfekt für einen Filmabend!",
    ],
    61: [
      "Ein bisschen Regen hält uns nicht auf!",
      "Schirm nicht vergessen!",
      "Regenjacke an und raus geht's!",
    ],
    63: [
      "Mäßiger Regen, ideal für einen gemütlichen Tag drinnen.",
      "Kuschelige Kleidung an und warmen Tee trinken!",
      "Vielleicht heute die Pflanzen draußen gießen lassen.",
    ],
    65: [
      "Starker Regen, bleib lieber drinnen!",
      "Perfektes Wetter für einen Film-Marathon!",
      "Ein guter Tag, um in der Badewanne zu relaxen.",
    ],
  };
  const defaultMessages = ["Mach das Beste aus dem Tag!"];
  return (funnyMessagesMap[code] || defaultMessages)[
    Math.floor(
      Math.random() * (funnyMessagesMap[code] || defaultMessages).length
    )
  ];
}

getLocation();
