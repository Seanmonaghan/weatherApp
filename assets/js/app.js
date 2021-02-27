const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const cityInformation = $("#cityInformation");
const previousSearchedCitiesList = $("#previousSearchedCitiesList")




// spans
const cityInformationTag = $("#cityInformationTag");
const currentTemperature = $("#currentTemperature");
const currentHumidity = $("#currentHumidity");
const currentWindSpeed = $("#currentWindSpeed")
const currentUVIndex = $("#currentUNIndex")
const card = $(".card");

const fiveDayForecastSpan = $("#fiveDayForecastSpan")
const firstDayForecastSpan = $("#firstDayForecastSpan")
const secondDayForecastSpan = $("#secondDayForecastSpan")
const thirdDayForecastSpan = $("#thirdDayForecastSpan")
const fourthDayForecastSpan = $("#fourthDayForecastSpan")
const fifthDayForecastSpan = $("#fifthDayForecastSpan")

function getApi(location) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=5d292a57cafb0a0a0714cf2da71abf3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            card.css("background-color", "white");
            card.css("border", "1px solid rgba(0,0,0,.125);")
            cityInformationTag.text("Current Weather for " + data.name + ", " +data.sys.country);
            currentTemperature.text("The current temperature is " + data.main.temp + "°F");
            currentHumidity.text("The current level of humidity is " + data.main.humidity + "%");
            currentWindSpeed.text("The current wind speed is " + data.wind.speed + " MPH");

            var lat = data.coord.lat
            var lon = data.coord.lon
            fiveDayForecast(lat, lon);
        });
    
};

function fiveDayForecast(lat, lon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=5d292a57cafb0a0a0714cf2da71abf3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDayForecastSpan.text("Five Day Forecast");
            firstDayForecastSpan.text("Today:");
            secondDayForecastSpan.text("Second Day Forecast:");
            thirdDayForecastSpan.text("Third Day Forecast:");
            fourthDayForecastSpan.text("Fourth Day Forecast Span:");
            fifthDayForecastSpan.text("Fifth Day Forecast Span");
            
        });
};



searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    getApi(inputValue);
});