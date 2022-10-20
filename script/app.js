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

let updateSun = (sunElement, minutesSunUp, totalMinutes) => {
  let percentage = (minutesSunUp / totalMinutes) * 100;
  sunElement.style.left = `${percentage}%`;
  const y = percentage > 50 ? (100 - percentage) * 2 : percentage * 2;
  sunElement.style.bottom = `${y}%`;
  var isNight = percentage > 100 || percentage < 0 ? document.querySelector('.is-day').classList.add('is-night') : document.querySelector('.is-day').classList.remove('is-night');
  sunElement.dataset.time = _parseMillisecondsIntoReadableTime(Date.now() / 1000);
};

let placeSunAndStartMoving = (totalMinutes, sunrise) => {
  const sunElement = document.querySelector('.js-sun');
  const minutesSunUp = Math.floor((Date.now() / 1000 - new Date(sunrise)) / 60);
  let percentage = (minutesSunUp / totalMinutes) * 100;
  console.log('percentage', percentage);
  document.querySelector('body').classList.add('is-loaded');

  const interval = setInterval(() => {
    updateSun(sunElement, minutesSunUp, totalMinutes);
    if (minutesSunUp > totalMinutes) {
      clearInterval(interval);
    }
  }, 1000);
};

const updateTimeAndTimeLeft = (sunset) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log('currentTime', currentTime);
  document.querySelector('.js-sun').setAttribute('data-time', currentTime);
  const timeBetween = new Date(sunset) - Date.now() / 1000;
  if (Math.floor(Math.floor(timeBetween / 60)) >= 0) {
    document.querySelector('.js-time-left').innerHTML = Math.floor(timeBetween / 60);
  } else {
    document.querySelector('.js-time-left').innerHTML = 0;
  }
  console.log(timeBetween / 60);
};
let showResult = (queryResponse) => {
  document.querySelector('.js-sunrise').innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);
  document.querySelector('.js-sunset').innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);
  document.querySelector('.js-location').innerHTML = `${queryResponse.city.name}, ${queryResponse.city.country}`;
  updateTimeAndTimeLeft(queryResponse.city.sunset);
  const totalMinutes = Math.floor((new Date(queryResponse.city.sunset) - new Date(queryResponse.city.sunrise)) / 60);
  console.log('totalMinutes', totalMinutes);
  placeSunAndStartMoving(totalMinutes, queryResponse.city.sunrise);
};
const getData = async (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => console.error(e));
};

let getAPI = async (lat, lon) => {
  const data = await getData(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4d5f6357a9dbe18f77e66a02b6bd1036&units=metric&lang=nl&cnt=1`);
  showResult(data);
};

document.addEventListener('DOMContentLoaded', function () {
  getAPI(50.8027841, 3.2097454);
});
