const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const cityInformation = $("#cityInformation");
const cityInformationTag = $("#cityInformationTag");
const currentTemperature = $("#currentTemperature");
const currentHumidity = $("#currentHumidity");
const currentWindSpeed = $("#currentWindSpeed")
const currentUVIndex = $("#currentUNIndex")
const card = $(".card");


function getApi(location) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=5d292a57cafb0a0a0714cf2da71abf3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.weather[0].main);
            card.css("background-color", "white");
            card.css("border", "1px solid rgba(0,0,0,.125);")
            cityInformationTag.text("Current Weather for " + data.name);
            currentTemperature.text("The current temperature is " + data.main.temp + "°F");
            currentHumidity.text("The current level of humidity is " + data.main.humidity + "%");
            currentWindSpeed.text("The current wind speed is " + data.wind.speed + "MPH");
        });
    
};



searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    getApi(inputValue);

});