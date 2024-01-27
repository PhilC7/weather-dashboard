$(document).ready(function () {

    /********************
    * GLOBAL VARIABLES
    ********************/
    var apiKey = "7a91cf58326cd6da40050bda09317cd6"
    var history = $("#history");
    var today = $("#today");
    var locations = []; // set array as variable
    var currentCity = ""; //current city variable to access data.
    var date = dayjs().format("DD/MM/YYYY"); //get current day and format it


    // add a delete history button
    var deleteHistory = $("<div>");
    deleteHistory.addClass("deleteHistory mt-3");
    var deleteBtn = $("<button>");
    deleteBtn.addClass("btn w-100 mb-3 delete");
    deleteBtn.attr("id", "delete")
    deleteBtn.text("Delete History");
    deleteHistory.append(deleteBtn);
    deleteHistory.insertBefore(".hr");



    // function to display weather
    function displayWeather(e) {
        today.empty();
        currentCity = $("#search-input").val() || currentCity; //set current city based on input

        // fetch data for today's forecast
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`;
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $("#today").css("background", "linear-gradient(180deg, rgba(196, 152, 106,1) 0%, rgba(102,156,236,1) 100%)")
                var placeName = $("<h2>").text(`${currentCity} (${date})`);
                var weatherCode = data.weather[0].icon;
                var weatherIcon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${weatherCode}@2x.png`);
                weatherIcon.addClass("icon");
                placeName.append(weatherIcon);
                var temp = $("<p>").text(`Temp: ${Math.floor(data.main.temp - 273.15)} ˚C`); //convert to ˚C a round down to the nearest number
                var wind = $("<p>").text(`Wind: ${data.wind.speed} KPH`);
                var humidity = $("<p>").text(`Humidity: ${data.main.humidity}%`);
                today.append(placeName, temp, wind, humidity);
            });

        // fetch data for 5 day forecast
        var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}`;
        $("#forecast").empty();
        $("#forecast").append($("<h3>5-Day Forecast</h3>"));
        fetch(forecastURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (forecast) {
                // get list of forecasts
                var forecasts = forecast.list;
                //create card for each of the next 5 days
                for (let i = 7; i < forecasts.length; i += 8) {
                    var day = new Date(forecast.list[i].dt * 1000) //convert unix time stamp into new date (dt * 1000)
                    var formattedDay = dayjs(day).format("DD/MM/YYYY");
                    var day = $("<h3>");
                    day.text(day)
                    var weatherCode = forecasts[i].weather[0].icon;
                    var weatherURL = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
                    $("#forecast").append(`
                    <div class="card col mx-3 rounded forecast" >
                    <div class="card-body">
                      <h5 class="card-title">${formattedDay}</h5>
                      <img src="${weatherURL}" alt="${forecasts[i].weather[0].description}" />
                      <p class="card-text temp">Temp: ${Math.floor(forecasts[i].main.temp - 273.15)} ˚C</p>
                      <p class="card-text wind">Wind: ${forecasts[i].wind.speed} KPH</p>
                      <p class="card-text humidity">Humidity: ${forecasts[i].main.humidity}%</p>
                    </div>
                  </div>`)
                    $(".card").css("color", "white");
                    $(".card").css("background", "linear-gradient(0deg, rgba(236,102,201,1) 0%, rgba(102,156,236,1) 100%)");
                }
            });
    };

    //event listener for search button
    $(".search-button").on("click", displayWeather);


    // function to render buttons from localStorage
    function renderButtons() {
        //clear history to prevent duplicate buttons
        history.empty();

        var loadCity = localStorage.getItem("city");
        if (loadCity == null || loadCity == "") {
            return;
        }

        var historyBtn = JSON.parse(loadCity);
        // create history button for each item of the array
        for (let i = 0; i < historyBtn.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("btn btn-secondary w-100 mb-3 history-btn");
            newBtn.attr("data-city", historyBtn[i]);
            newBtn.text(historyBtn[i])
            $("#history").append(newBtn);
        }
    }

    // click event to handle information entered in the search input field.
    $(".search-button").on("click", function (event) {
        event.preventDefault();
        var cityName = $("#search-input").val().trim();
        locations.push(cityName)
        var stringifiedLocations = JSON.stringify(locations);
        $("#search-input").val("");
        localStorage.setItem("city", stringifiedLocations);
        renderButtons()
    });


    //click event to display any city data from history
    history.on("click", ".history-btn", function (e) {
        currentCity = e.target.firstChild.data;
        displayWeather()
    })

    //event listener to delete history
    $(".delete").on("click", function (e) {
        localStorage.clear();
    });

    // call function to display initial history buttons
    renderButtons()

});
