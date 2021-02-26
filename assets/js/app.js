const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');


function getApi(location) {
    console.log(location);

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=5d292a57cafb0a0a0714cf2da71abf3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

getApi('London');