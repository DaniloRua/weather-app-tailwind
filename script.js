const API_KEY = `3b2cfc2c634fd33d5f046d2a97118c96`;
const temperature = document.getElementById('temperature');
const cityPlacement = document.getElementById('city');
const country = document.getElementById('country');
const average = document.getElementById('average');

function setCity (){
const city = document.getElementById('city_name').value

fetchCityName(city)

}
function fetchCityName(e){  

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=5&appid=${API_KEY}`)
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    let countryName = data[0].country;
    let cityName = data[0].name;
    
  //   const otherInfo = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m_max`)
  // .then((response)=> response.json())
  // .then((data) => console.log(data))


    const fetchWeather = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
  .then((response)=> response.json())
 .then(data => {console.log(data)

const curremtTemp = data.hourly.temperature_2m[0];
const arr = data.hourly.temperature_2m; 
let sum = 0;
for (let number of arr) {
    sum += number;
}
averageTemp = sum /arr.length;

average.innerHTML="AVERAGE TEMPERATURE: " + parseInt(averageTemp)
temperature.innerHTML = curremtTemp
cityPlacement.innerHTML= cityName
country.innerHTML = countryName
})
 .catch((error)=> console.log(error));
 
})
.catch((error)=> console.log(error))
}



