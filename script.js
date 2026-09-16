const cityInput = document.querySelector(".city-input");  
const searchButton = document.querySelector(".search-button");

const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const weatherIcon = document.querySelector(".weather-icon");

searchButton.addEventListener("click", function() {

    const city = cityInput.value;

    cityName.textContent = city;

    if (city === "") {
        document.querySelector(".error-message").textContent = "Please enter a city name.";
    }

        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
            .then(function(response) {
             return response.json();
            })
            .then(function(data) {
                const location = data.results[0];

                const latitude = location.latitude;
                const longitude = location.longitude;

                console.log(latitude);
                console.log(longitude);

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
            
            fetch(weatherUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    console.log(data.current);
                    
                    const currentTemperature = data.current.temperature_2m;
                    console.log(currentTemperature);

                    temperature.textContent = currentTemperature;

                    const weatherCode = data.current.weather_code;
                    console.log(weatherCode);

                    if (weatherCode === 0) {
                        weatherDescription.textContent = "Clear sky";
                        weatherIcon.textContent = "☀️";

                    } else if (weatherCode === 1) {
                        weatherDescription.textContent = "Mainly clear";
                        weatherIcon.textContent = "🌤️";

                    } else if (weatherCode === 2) {
                        weatherDescription.textContent = "Partly cloudy";
                        weatherIcon.textContent = "⛅";

                    } else if (weatherCode === 3) {
                        weatherDescription.textContent = "Overcast";
                        weatherIcon.textContent = "☁️";

                    } else if (weatherCode === 45 || weatherCode === 48) {
                        weatherDescription.textContent = "Fog";
                        weatherIcon.textContent = "🌫️";

                    } else if (weatherCode >= 51 && weatherCode <= 57) {
                        weatherDescription.textContent = "Drizzle";
                        weatherIcon.textContent = "🌦️";

                    } else if (weatherCode >= 61 && weatherCode <= 67) {
                        weatherDescription.textContent = "Rain";
                        weatherIcon.textContent = "🌧️";

                    } else if (weatherCode >= 71 && weatherCode <= 77) {
                        weatherDescription.textContent = "Snow";
                        weatherIcon.textContent = "❄️";

                    } else if (weatherCode >= 80 && weatherCode <= 82) {
                        weatherDescription.textContent = "Rain showers";
                        weatherIcon.textContent = "🌦️";

                    } else if (weatherCode === 85 || weatherCode === 86) {
                        weatherDescription.textContent = "Snow showers";
                        weatherIcon.textContent = "🌨️";

                    } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
                        weatherDescription.textContent = "Thunderstorm";
                        weatherIcon.textContent = "⛈️";

                    } else {
                        weatherDescription.textContent = "Unknown weather";
                        weatherIcon.textContent = "❓";
                    }

                });
            });
        });