const API_KEY = `3b2cfc2c634fd33d5f046d2a97118c96`;
const temperature = document.getElementById('temperature');
const cityPlacement = document.getElementById('city');
const country = document.getElementById('country');
const average = document.getElementById('average');
const city = document.getElementById('city-name')
let date = new Date();
let currentHour = date.toTimeString().slice(0,2)

city.addEventListener("keyup", function(e){
 if(e.code === 'Enter'|| "13"){
    setCity();
 }
})
function setCity() {

  fetchCityName(city.value)

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
          const arr = data.hourly.temperature_2m;
          let sum = 0;
          for (let number of arr) {
            sum += number;
          }
          averageTemp = sum / arr.length;
          average.innerHTML = "AVERAGE: " + parseInt(averageTemp) + "°C";
          temperature.innerHTML = curremtTemp + "°C";
          cityPlacement.innerHTML = cityName;
          country.innerHTML = countryName;
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};



