$(document).ready(function () {

    /********************
    * GLOBAL VARIABLES
    ********************/
    var apiKey = "7a91cf58326cd6da40050bda09317cd6"
    var cityName = $("#search-input");
    var history = $("#history");
    var today = $("#today");
    var forecast = $("#forecast");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    console.log(forecast);


});