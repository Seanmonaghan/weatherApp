var DateTime = luxon.DateTime;

// Search Button Elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const cityInformation = $("#cityInformation");

const card = $(".card");
const fiveDayCard = $(".fiveDayCard");


// Current Day Weather Display Elements
const cityInformationTag = $("#cityInformationTag");
const currentTemperature = $("#currentTemperature");
const currentHumidity = $("#currentHumidity");
const currentWindSpeed = $("#currentWindSpeed");
const currentUVIndex = $("#currentUVIndex");
const currentTime = $("#currentTime");
const currentWeatherIcon = $("#currentWeatherIcon")


// Five Day Forecast Header Spans
const fiveDayForecastSpan = $("#fiveDayForecastSpan");
const firstDayForecastSpan = $("#firstDayForecastSpan");
const secondDayForecastSpan = $("#secondDayForecastSpan");
const thirdDayForecastSpan = $("#thirdDayForecastSpan");
const fourthDayForecastSpan = $("#fourthDayForecastSpan");
const fifthDayForecastSpan = $("#fifthDayForecastSpan");

// Icon Spans
const firstDayIcon = $("#firstDayIcon");
const secondDayIcon = $("#secondDayIcon");
const thirdDayIcon = $("#thirdDayIcon");
const fourthDayIcon = $("#fourthDayIcon");
const fifthDayIcon = $("#fifthDayIcon");

// 5 Day Temp Spans
const firstDayTemp = $("#firstDayTemp");
const secondDayTemp = $("#secondDayTemp");
const thirdDayTemp = $("#thirdDayTemp");
const fourthDayTemp = $("#fourthDayTemp");
const fifthDayTemp = $("#fifthDayTemp");

// 5 Day Humidity Spans
const firstDayHumidity = $("#firstDayHumidity")
const secondDayHumidity = $("#secondDayHumidity")
const thirdDayHumidity = $("#thirdDayHumidity")
const fourthDayHumidity = $("#fourthDayHumidity")
const fifthDayHumidity = $("#fifthDayHumidity")

// List Item Variables
const previousSearchedCitiesList = $("#previousSearchedCitiesList")


function getCurrentWeather(location) {
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
            fiveDayCard.css("background-color", "#97BADE");
            fiveDayCard.css("color", "white");
            fiveDayCard.css("border-radius", "15px")
            currentUVIndex.text("The current UVI is " + data.current.uvi);
            currentWeatherIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png' alt='Weather icon'></div>")
            //Setting Dates Based on Timezone Selected 
            var local = DateTime.local();
            var reZoned = local.setZone(data.timezone);
            currentTime.text(reZoned.toLocaleString(DateTime.DATETIME_FULL));
            // Set reZoned days for the 5 day forecast
            var day1 = reZoned.plus({days:1}).toLocaleString();
            var day2 = reZoned.plus({days:2}).toLocaleString();
            var day3 = reZoned.plus({days:3}).toLocaleString();
            var day4 = reZoned.plus({days:4}).toLocaleString();
            var day5 = reZoned.plus({days:5}).toLocaleString();

            // Set Headings for each day as the local date
            fiveDayForecastSpan.text("Five Day Forecast");
            firstDayForecastSpan.text(day1);
            secondDayForecastSpan.text(day2);
            thirdDayForecastSpan.text(day3);
            fourthDayForecastSpan.text(day4);
            fifthDayForecastSpan.text(day5);

            // set Icon Spans
            firstDayIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png' alt='Weather icon'></div>");
            secondDayIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png' alt='Weather icon'></div>");
            thirdDayIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png' alt='Weather icon'></div>");
            fourthDayIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png' alt='Weather icon'></div>");
            fifthDayIcon.html("<div id='icon'><img id='wicon' src='http://openweathermap.org/img/w/" + data.daily[5].weather[0].icon + ".png' alt='Weather icon'></div>");
            // set Daily Temp
            firstDayTemp.text("Temp: " + data.daily[1].temp.day + "°F");
            secondDayTemp.text("Temp: " + data.daily[2].temp.day + "°F");
            thirdDayTemp.text("Temp: " + data.daily[3].temp.day + "°F");
            fourthDayTemp.text("Temp: " + data.daily[4].temp.day + "°F");
            fifthDayTemp.text("Temp: " + data.daily[5].temp.day + "°F");

            // set Daily Humidity
            firstDayHumidity.text("Humidity: " + data.daily[1].humidity + "%");
            secondDayHumidity.text("Humidity: " + data.daily[2].humidity + "%");
            thirdDayHumidity.text("Humidity: " + data.daily[3].humidity + "%");
            fourthDayHumidity.text("Humidity: " + data.daily[4].humidity + "%");
            fifthDayHumidity.text("Humidity: " + data.daily[5].humidity + "%");
            
            
        } );
};



// Generates Searched Cities as List Items
function generateListItem(location) {
    searchedCitiesArray = []
    searchedCitiesArray.push(location);
    
    for (i = 0; i < searchedCitiesArray.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = searchedCitiesArray[i];
        listItem.classList.add('listItems');
        previousSearchedCitiesList.prepend(listItem);
    }

    $( ".listItems" ).on( "click", function() {
        let location = this.textContent;
        getCurrentWeather(location);
      });
} 

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    generateListItem(inputValue);
    getCurrentWeather(inputValue);
});




