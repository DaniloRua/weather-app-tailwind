const API_KEY = `3b2cfc2c634fd33d5f046d2a97118c96`;
const temperature = document.getElementById('temperature')

function setCity (){
const city = document.getElementById('city_name').value

fetchCityName(city)

}
function fetchCityName(e){  

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=5&appid=${API_KEY}`)
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    const fetchWeather = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
  .then((response)=> response.json())
 .then(data => {console.log(data)
const curremtTemp = data.hourly.temperature_2m[0]
temperature.innerHTML = curremtTemp

})
 .catch((error)=> console.log(error));
 
})
.catch((error)=> console.log(error))
}



// }
    // const city = data.name;
    // 
    // const description = data.weather[0].description;
  
    // document.getElementById("city").innerHTML = city;
    // document.getElementById("temperature").innerHTML = temperature;
    // document.getElementById("weather-description").innerHTML = description;;
  


