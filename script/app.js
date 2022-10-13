let sunriseElement,
  sunsetElement,
  locationElelement,
  minutesLeftElement,
  sunElement,
  totalTime = 0;
// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = '0' + date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp (gebruiken we nu niet)
  // const seconds = '0' + date.getSeconds();

  // Will display time in 10:30(:23) format
  return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie
let updateSun = (sunElement,sunrise, sunUpTotalMinutes,totalMinutes, interval) => {
  let currentTime = new Date(Date.now());
  let sunUp = new Date(Date.now() - sunrise);
  let percentage = 100 - (sunUpTotalMinutes / totalMinutes) * 10;
  if(sunUpTotalMinutes<=totalMinutes+1){
    sunElement.style.left = percentage + '%';
    if (percentage < 50) {
      sunElement.style.bottom = 2 * procent + '%';
    } else {
      sunElement.style.bottom = 2 * (100 - procent) + '%';
    }
  }else{
    document.querySelector('html').classList.add('is-night');
    clearInterval(interval);
  }
};
// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
  // In de functie moeten we eerst wat zaken ophalen en berekenen.
  // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
  // Bepaal het aantal minuten dat de zon al op is.
  // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
  // We voegen ook de 'is-loaded' class toe aan de body-tag.
  // Vergeet niet om het resterende aantal minuten in te vullen.
  // Nu maken we een functie die de zon elke minuut zal updaten
  // Bekijk of de zon niet nog onder of reeds onder is
  // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
  // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.

  let currentTime = new Date(Date.now());
  let sunUp = new Date(Date.now() - sunrise);
  let sunUpTotalMinutes = sunUp.getHours() * 60 + sunUp.getMinutes();
  let percentage = 100 - (sunUpTotalMinutes / totalMinutes) * 10;
  console.log(percentage);

  if (sunUpTotalMinutes <= totalMinutes + 1) {
    sunsetElement.dataset.time = `${currentTime.getHours()}':'${currentTime.getMinutes()}`;
    sunElement.style.left = percentage + '%';
    if (percentage < 50) {
      sunElement.style.bottom = 2 * procent + '%';
    } else {
      sunElement.style.bottom = 2 * (100 - procent) + '%';
    }
  }

  let interval = setInterval(function () {
    updateSun(sunElement,sunrise, sunUpTotalMinutes,totalMinutes, currentTime, interval);
  }, 1000);
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
  console.log(queryResponse);
  sunriseElement.innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);
  sunsetElement.innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);
  let currentTime = new Date().getTime() / 1000;
  minutesLeftElement = Math.round((queryResponse.city.sunset - currentTime) / 60);
  console.log(minutesLeftElement);
  timeLeftelement.innerHTML = minutesLeftElement;
  let totalDayTime = new Date(queryResponse.city.sunset - queryResponse.city.sunrise);
  let totalMinutes = totalDayTime.getHours() * 60 + totalDayTime.getMinutes();
  placeSunAndStartMoving(totalMinutes, queryResponse.city.sunrise);
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(e));
};
// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  // Als dat gelukt is, gaan we naar onze showResult functie.
  let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d5f6357a9dbe18f77e66a02b6bd1036&units=metric&lang=nl&cnt=1`;
  const data = await getData(url);
  showResult(data);
};

document.addEventListener('DOMContentLoaded', function () {
  // 1 We will query the API with longitude and latitude.
  sunriseElement = document.querySelector('.js-sunrise');
  sunsetElement = document.querySelector('.js-sunset');
  locationElelement = document.querySelector('.js-location');
  sunElement = document.querySelector('.js-sun');
  timeLeftelement = document.querySelector('.js-time-left');
  getAPI(50.8027841, 3.2097454);
});
