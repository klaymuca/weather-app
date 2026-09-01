const cityInput = document.querySelector(".city-input");  

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", function() {
    
    const city = cityInput.value;

    if (city === "") {
        document.querySelector(".error-message").textContent = "Please enter a city name.";
    }

});