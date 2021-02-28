var DateTime = luxon.DateTime;

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const cityInformation = $("#cityInformation");
const previousSearchedCitiesList = $("#previousSearchedCitiesList")



// spans
const cityInformationTag = $("#cityInformationTag");
const currentTemperature = $("#currentTemperature");
const currentHumidity = $("#currentHumidity");
const currentWindSpeed = $("#currentWindSpeed")
const currentUVIndex = $("#currentUVIndex")
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
            if (response.status !== 200) {
                alert("city not found - please try again!");
              }
            return response.json();
        })
        .then(function (data) {
            
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
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=5d292a57cafb0a0a0714cf2da71abf3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            var local = DateTime.local();
            var reZoned = local.setZone(data.timezone);
            var shortReZoned = reZoned.toLocaleString();
            var day2 = reZoned.plus({days:1}).toLocaleString();
            var day3 = reZoned.plus({days:2}).toLocaleString();
            var day4 = reZoned.plus({days:3}).toLocaleString();
            var day5 = reZoned.plus({days:4}).toLocaleString();


            
            currentUVIndex.text("The current UVI is " + data.current.uvi);



            // DO THIS NEXT
            fiveDayForecastSpan.text("Five Day Forecast");
            
            firstDayForecastSpan.text(shortReZoned);
            secondDayForecastSpan.text(day2);
            thirdDayForecastSpan.text(day3);
            fourthDayForecastSpan.text(day4);
            fifthDayForecastSpan.text(day5);
            
        });
};



searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    getApi(inputValue);
});