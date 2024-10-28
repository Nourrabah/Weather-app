// script.js

const apiKey = 'acb81dacc969869fa87a10644e750134';

const units = 'metric'; 

const fetchWeather = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
        );
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather data:", error);
    }
};

const fetchForecast = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
        );
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
};

const displayCurrentWeather = (data) => {
    document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.description').textContent = data.weather[0].description;
    document.querySelector('.weather div:nth-child(1) div:nth-child(3)').textContent = `${data.wind.speed} Km/h`;
    document.querySelector('.weather div:nth-child(2) div:nth-child(3)').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.querySelector('.weather div:nth-child(3) div:nth-child(3)').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
};

const displayForecast = (data) => {
    const forecastDays = document.querySelectorAll('.day');
    for (let i = 0; i < forecastDays.length; i++) {
        const forecast = data.list[i * 8]; // Forecast every 24 hours (3-hour intervals)
        forecastDays[i].querySelector('.name').textContent = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        forecastDays[i].querySelector('.max div').textContent = `${Math.round(forecast.main.temp_max)}°`;
        forecastDays[i].querySelector('.min div').textContent = `${Math.round(forecast.main.temp_min)}°`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const defaultCity = "Albuquerque";
    fetchWeather(defaultCity);
    fetchForecast(defaultCity);
});
