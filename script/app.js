let sunriseElement, sunsetElement, locationElement, sunElement, timeLeftelement;
let totalTime = 0;

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

const placeSun = (sunrise) =>{
	const now = new Date();
	const sunriseDate = new Date(sunrise*1000);

	const minutesLeft = now.getHours()*60+now.getMinutes() - (sunriseDate.getHours()*60+sunriseDate.getMinutes());

	const percentage =(totalTime)

	const sunLeftPositon = percentage;
	const sunLeftPosition = percentage>50?100-percentage:percentage*2;

	sunElement.style.left = `${sunLeftPositon}%`;
	sunElement.style.top = `${sunLeftPosition}%`;
}
const updateTimeAndTimeLeft = (timeLeftTimeStamp) => {
  sunElement.dataset.time = new Date(timeLeftTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeLeftelement.innerText = new Date(timeLeftTimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
const setDomElements = function () {
  sunriseElement = document.querySelector('.js-sunrise');
  sunsetElement = document.querySelector('.js-sunset');
  locationElement = document.querySelector('.js-location');
  sunElement = document.querySelector('.js-sun');
  timeLeftelement = document.querySelector('.js-time-left');
};

// 5 TODO: maak updateSun functie

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
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
  //queryResponseGlobal = queryResponse;
  console.log(queryResponse);
  let sunriseString = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);
  console.log(sunriseString);
  sunriseElement.innerText = sunriseString;
  let sunsetString = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);
  console.log(sunsetString);
  sunsetElement.innerText = sunsetString;
  locationElement = `${queryResponse.city.name}, ${queryResponse.city.country}`;
  let totalMinutes = (queryResponse.city.sunset - queryResponse.city.sunrise) / 60;
  console.log(totalMinutes);
  totalTime = queryResponse.city.sunset - queryResponse.city.sunrise;
  console.log(`totaltime ${totalTime}`);
  updateTimeAndTimeLeft(totalTime);
  placeSun(queryResponse.city.sunrise);
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(e));
};

const getEndpoint = (lat, lon) => {
  return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d5f6357a9dbe18f77e66a02b6bd1036&units=metric&lang=nl&cnt=1`;
};
// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  // Als dat gelukt is, gaan we naar onze showResult functie.
  //let url = "http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d5f6357a9dbe18f77e66a02b6bd1036&units=metric&lang=nl&cnt=1";
  const data = await getData(getEndpoint(lat, lon));
  queryResponseGlobal = data;
  showResult(data);
};

document.addEventListener('DOMContentLoaded', function () {
  // 1 We will query the API with longitude and latitude.
  setDomElements();
  getAPI(50.8597302, 3.2359596);

  //updateTimeAndTimeLeft(queryResponseGlobal.sunset - queryResponseGlobal.sunrise);
});
