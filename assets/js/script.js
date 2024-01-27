$(document).ready(function () {

    /********************
    * GLOBAL VARIABLES
    ********************/
    var apiKey = "7a91cf58326cd6da40050bda09317cd6"
    var history = $("#history");
    var today = $("#today");
    var locations = [];
    var currentCity = "London"; //current city variable to access data.
    var date = dayjs().format("DD/MM/YYYY");


    // function to display weather
    function displayWeather(e) {
        today.empty();
        currentCity = $("#search-input").val(); //set current city based on input

        console.log(currentCity);
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`;
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                var placeName = $("<h2>").text(`${currentCity} (${date})`);
                var weatherCode = data.weather[0].icon;
                var weatherIcon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${weatherCode}@2x.png`);
                weatherIcon.addClass("icon");
                placeName.append(weatherIcon);
                console.log(weatherCode);
                var temp = $("<p>").text(`Temp: ${Math.floor(data.main.temp - 273.15)} ˚C`);
                var wind = $("<p>").text(`Wind: ${data.wind.speed} KPH`);
                var humidity = $("<p>").text(`Humidity: ${data.main.humidity}%`);

                today.append(placeName, temp, wind, humidity);
                console.log(queryURL);
            });

        var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}`;
        $("#forecast").empty();
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (forecast) {
                // get list of forecasts

                var forecasts = forecast.list;
                console.log(forecasts);
                for (let i = 7; i < forecasts.length; i += 8) {
                    var day = new Date(forecast.list[i].dt * 1000)
                    var formattedDay = dayjs(day).format("DD/MM/YYYY");
                    var day = $("<h3>");
                    day.text(day)

                    var weatherCode = forecasts[i].weather[0].icon;
                    var weatherURL = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;


                    $("#forecast").append(`
                    <div class="card col mx-2 forecast" >
                    <div class="card-body">
                      <h5 class="card-title">${formattedDay}</h5>
                      <img src="${weatherURL}" alt="${forecasts[i].weather[0].description}" />
                      <p class="card-text temp">Temp: ${Math.floor(forecasts[i].main.temp - 273.15)} ˚C</p>
                      <p class="card-text wind">Wind: ${forecasts[i].wind.speed} KPH</p>
                      <p class="card-text humidity">Humidity: ${forecasts[i].main.humidity}%</p>
                    </div>
                  </div>`)
                }
            });
    };

    //event listener for search button
    $(".search-button").on("click", displayWeather);


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
            newBtn.attr("data-city", historyBtn[i]);
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
    });


    // call function to display initial history buttons
    renderButtons()




});


// HOW TO ACCESS REQUIRED INFO
// console.log(data.name);
// console.log(Math.floor(data.main.temp - 273.15) + "˚C");
// console.log(data.wind.speed);
// console.log(data.weather[0].icon);