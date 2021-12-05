
// searchButton.addEventListener("click", getWeatherData);


var apiUrl = "api.openweathermap.org/data/2.5/weather?q=phoenix&appid=eda4403bd9c90cb2bfa5115b8964ea2f&units=imperial"
// var searchButton = document.querySelector("#searchButton");
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

// var getWeatherData = function() {
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=eda4403bd9c90cb2bfa5115b8964ea2f").then(function(response){
//     if (response.ok) {
//         response.json().then(function(data){
//             // displayWeather(data);
//             console.log(data);
//         });
//     } else {
//         alert("Could not find city; try again.")
//     }
//     });
// };


searchButton.addEventListener("click", function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityinput.value+"&appid=eda4403bd9c90cb2bfa5115b8964ea2f&units=imperial").then(function(response){
    if (response.ok) {
        response.json().then(function(data){
        // displayWeather(data);
        console.log(data);
            currentDisplay(data);
        });
    } else {
        alert("Could not find city; try again.")
        }
    });
    });

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
    // Fix
    var weatherIconDisplay = ['weather']['0'][4];
    weatherIcon.innerHTML = weatherIconDisplay;
    
    var uvIndexDisplay = []
    uvIndex.innerText = uvIndexDisplay; 

};
    
