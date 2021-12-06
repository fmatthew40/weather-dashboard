

var searchButton = document.getElementById("searchButton");

var cityinput = document.querySelector("#city-search");
// Current City Display Variables
var cityName = document.querySelector("#cityName");
var date = document.querySelector("#date");
var weatherIcon = document.querySelector("#weatherIcon");
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#windSpeed");
var uvIndex = document.querySelector("#uvIndex");

searchButton.addEventListener("click", function(){
    fetchWeather(cityinput.value);
});

var fetchWeather = function(city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=eda4403bd9c90cb2bfa5115b8964ea2f&units=imperial").then(function(response){
    if (response.ok) {
        response.json().then(function(data){
        // displayWeather(data);
        console.log(data);
        currentDisplay(data);
        uvi();

        var savedCities = localStorage.getItem("cities")
        savedCities = savedCities ? savedCities.split(',') : [];

        savedCities = savedCities.filter(function(localCity){
            return localCity.toLowerCase() !== city.toLowerCase();
        });

        savedCities.push(city);

       localStorage.setItem("cities", savedCities.join(','));
       loadCities();
        });
    } else {
        alert("Could not find city; try again.")
        }
    });

}

var currentDisplay = function(data) {
    var nameDisplay = data['name'];
    cityName.innerText = nameDisplay;
    $("#date").text(moment().format("dddd, MMMM Do YYYY"));
    var humidityDisplay = "Humidity: " + data['main']['humidity']+"%";
    humidity.innerText = humidityDisplay; 
    var temperatureDisplay = "Temperature: " + data['main']['temp']+"°F";
    temperature.innerText = temperatureDisplay;
    var windSpeedDisplay = "Wind Speed: " + data['wind']['speed']+"mph";
    windSpeed.innerText = windSpeedDisplay; 
    var imageCode = data.weather[0].icon;
    weatherIcon.setAttribute("src","http://openweathermap.org/img/w/" + imageCode + ".png")
   
    var lon = data.coord.lon;
    var lat = data.coord.lat;

    uvi(lon, lat);

    
};
var uviColor = document.getElementById("uvchange");
var uvi = function(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=eda4403bd9c90cb2bfa5115b8964ea2f").then(function(response) {
    if (response.ok) {
    response.json().then(function(datab){
        console.log(datab)
        var uvidisplay = datab['current']['uvi'];
        uvIndex.innerText = "UV Index: " +uvidisplay;
    //  uvColorChange(uvidisplay);
    });
    }else {
        console.log("error retrieving");
    };
        });
}; 
// fix - bug - try to remove class list during each if statement
// uvColorChange = function (uvidisplay) {
//     if (uvidisplay < 3) {
//         uviColor.classList.add('change-green');
//     }; if (uvidisplay >= 3 && uvidisplay < 6) {
//         uviColor.classList.add('change-yellow')
//     }; if (uvidisplay > 6) {
//         uviColor.classList.add('change-red')
//     };
    
// };



var loadCities = function() {

    var searchResultsArea = document.getElementById("search-results");
    // var searchButton = document.createElement("button");
    // console.log(searchButton);
    // innertext
    // searchButton.innerText = 

    var cities = localStorage.getItem("cities");
    cities = cities ? cities.split(",") : [];
    console.log(cityinput);


    // searchResultsArea.appendChild(searchButton);
    searchResultsArea.innerHTML = "";

    for (i =0; i < cities.length; i++) {
        var searchButton = document.createElement("button");
        searchButton.innerText = cities[i];
        searchButton.addEventListener("click", function(event){
            console.log(event)
            fetchWeather(event.target.innerText);
        });
        searchResultsArea.appendChild(searchButton);
    }
};

loadCities()