// fetch api key
const apiKey = "d11af0d7ab6deea8b79c5cd39405b0ad";

// fetch elements from html
const weatherData = document.getElementById('weather-data');
const cityInput = document.getElementById('city-input');
const formEl = document.querySelector('form');

// Events
formEl.addEventListener("submit", (e)=>{
    e.preventDefault();

    const cityValue = cityInput.value;

    getWeatherData(cityValue);
});

async function getWeatherData(cityVal){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=metric`);

        if (!response.ok) throw new Error("Network response was not OK");

        const data = await response.json();

        // console.log(data);
        
        const temprature = Math.round(data.main.temp);
        
        const description = data.weather[0].description;
        
        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" class="w-100 h-100">`;

        weatherData.querySelector(".temprature").textContent = `${temprature}°C`;
        
        weatherData.querySelector(".description").textContent = `${description}`;
        
        weatherData.querySelector(".details ").innerHTML = details.map((det) => `<div class="p-20 m-10 flxone rad-6 txt-c ">${det}</div>`).join("");    
    
    } catch (error) {

        weatherData.querySelector(".icon").innerHTML = ``;

        weatherData.querySelector(".temprature").textContent = ``;
        
        weatherData.querySelector(".description").textContent = `An Error Entered, Please try again`;
        
        weatherData.querySelector(".details ").innerHTML = ``;        
    }
}
