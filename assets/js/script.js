$(document).ready(function () {

    /********************
    * GLOBAL VARIABLES
    ********************/
    var apiKey = "7a91cf58326cd6da40050bda09317cd6"
    // var cityName = $("#search-input");
    var cityName = "London";
    var history = $("#history");
    var today = $("#today");
    var forecast = $("#forecast");
    var locations = [];

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        });

});


// HOW TO ACCES REQUIRED INFO
// console.log(data.name);
// console.log(Math.floor(data.main.temp - 273.15) + "˚C");
// console.log(data.wind.speed);
// console.log(data.weather[0].icon);