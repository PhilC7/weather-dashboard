$(document).ready(function () {

    /********************
    * GLOBAL VARIABLES
    ********************/
    var apiKey = "7a91cf58326cd6da40050bda09317cd6"
    var history = $("#history");
    var today = $("#today");
    var forecast = $("#forecast");
    var locations = [];


    // function to display weather

    function displayWeather() {

    };
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    // fetch(queryURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);

    //     });

    // function to render buttons from localStorage
    function renderButtons() {
        //clear history to prevent duplicate buttons
        $("#history").empty();

        var loadCity = localStorage.getItem("city");
        if (loadCity == null || loadCity == "") {
            return;
        }

        var historyBtn = JSON.parse(loadCity);
        // create history button for each item of the array
        for (let i = 0; i < historyBtn.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("btn btn-secondary w-100 mb-3");
            newBtn.text(historyBtn[i])
            $("#history").append(newBtn);
        }
    }

    // click event to handle information entered in the search input field.
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var cityName = $("#search-input").val().trim();
        locations.push(cityName)
        var stringifiedLocations = JSON.stringify(locations);
        $("#search-input").val("");
        localStorage.setItem("city", stringifiedLocations);

        renderButtons()
        console.log('clicked');
    });


    $(document).on("click", ".search-button", displayWeather);


    // call function to display initial history buttons
    renderButtons()




});


// HOW TO ACCESS REQUIRED INFO
// console.log(data.name);
// console.log(Math.floor(data.main.temp - 273.15) + "˚C");
// console.log(data.wind.speed);
// console.log(data.weather[0].icon);