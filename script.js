const cityInput = document.querySelector(".city-input");  

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", function() {

    const city = cityInput.value;

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
                    
                    const temperature = data.current.temperature_2m;
                    console.log(temperature);

                    const weatherCode = data.current.weather_code;
                    console.log(weatherCode);

                });
            });
        });