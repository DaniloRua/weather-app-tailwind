const API_KEY = `YOUR API KEY`;
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let date = new Date();
let currentHour = date.toTimeString().slice(0, 2);
const temperature = document.getElementById('temperature');
const cityPlacement = document.getElementById('city');
const country = document.getElementById('country');
const average = document.getElementById('average');
const city = document.getElementById('city-name');
const nextDay1 = document.getElementById('next-day-1');
const nextDay2 = document.getElementById('next-day-2');
const nextDay3 = document.getElementById('next-day-3');
const nextDay4 = document.getElementById('next-day-4');
const nextDay5 = document.getElementById('next-day-5');
let weekDay1 = document.getElementById('next-weekday-1').innerHTML = weekday[date.getDay() + 1]
let weekDay2 = document.getElementById('next-weekday-2').innerHTML = weekday[date.getDay() + 2]
let weekDay3 = document.getElementById('next-weekday-3').innerHTML = weekday[date.getDay() + 3]
let weekDay4 = document.getElementById('next-weekday-4').innerHTML = weekday[date.getDay() + 4]
let weekDay5 = document.getElementById('next-weekday-5').innerHTML = weekday[date.getDay() + 5]
function sumArray(i) {
  sum = 0;
  i.forEach(val => {
    sum += val;
  });
  return sum;
}
city.addEventListener("keydown", function (e) {
  if (e.code === 'Enter' || e.code === '13') {
    setCity()
  }
})
function setCity() {
  fetchCityName(city.value)
  city.value = '';
}
function fetchCityName(e) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=5&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let latitude = data[0].lat;
      let longitude = data[0].lon;
      let countryName = data[0].country;
      let cityName = data[0].name
      const fetchWeather = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
        .then((response) => response.json())
        .then(data => {
          console.log(data)
          const curremtTemp = data.hourly.temperature_2m[`${+currentHour}`];
          const temperatures = data.hourly.temperature_2m;
          const temp24 = Object.values(temperatures).slice(0, 24);
          const tempNextDay1 = Object.values(temperatures).slice(24, 48);
          const tempNextDay2 = Object.values(temperatures).slice(48, 72);
          const tempNextDay3 = Object.values(temperatures).slice(72, 96);
          const tempNextDay4 = Object.values(temperatures).slice(96, 120);
          const tempNextDay5 = Object.values(temperatures).slice(120, 144);
          averageTemp = sumArray(temp24) / temp24.length;
          averageNextDay1 = sumArray(tempNextDay1) / tempNextDay1.length;
          averageNextDay2 = sumArray(tempNextDay2) / tempNextDay2.length;
          averageNextDay3 = sumArray(tempNextDay3) / tempNextDay3.length;
          averageNextDay4 = sumArray(tempNextDay4) / tempNextDay4.length;
          averageNextDay5 = sumArray(tempNextDay5) / tempNextDay5.length;
          average.innerHTML = "AVERAGE: " + parseInt(averageTemp) + "°C";
          temperature.innerHTML = curremtTemp + "°C";
          cityPlacement.innerHTML = cityName;
          country.innerHTML = countryName;
          nextDay1.innerHTML = parseInt(averageNextDay1) + "°C";
          nextDay2.innerHTML = parseInt(averageNextDay2) + "°C";
          nextDay3.innerHTML = parseInt(averageNextDay3) + "°C";
          nextDay4.innerHTML = parseInt(averageNextDay4) + "°C";
          nextDay5.innerHTML = parseInt(averageNextDay5) + "°C";
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
